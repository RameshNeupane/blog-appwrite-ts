import { Models } from "appwrite";
import service from "@appwrite/service";
import { rootState } from "@store/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    IAddNewPostData,
    PostFromDB,
    IUpdatePostData,
} from "src/types/posts.types";

interface IInitialState {
    posts: PostFromDB[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string;
}

// initial state
const initialState: IInitialState = {
    posts: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: "",
};

// add new post
export const addNewPost = createAsyncThunk(
    "posts/addNewPost",
    async ({ data, userId }: IAddNewPostData) => {
        let fileId;
        try {
            const file = await service.uploadFile(data.image[0]);

            if (file) {
                fileId = file.$id;
                const { title, content, slug, status } = data;
                const newPost = await service.createPost(slug, {
                    title,
                    content,
                    featuredImage: fileId,
                    status,
                    userId,
                });
                if (newPost) {
                    return newPost;
                }
            }
        } catch (error) {
            await service.deleteFile(fileId as string);
            throw error;
        }
    }
);

// update post
export const updatePost = createAsyncThunk(
    "posts/updatePost",
    async ({ post, data }: IUpdatePostData) => {
        // handle file i.e. image file
        const file =
            data?.image.length > 0
                ? await service.uploadFile(data.image[0])
                : null;

        // delete old image after new image is uploaded successfully
        if (file) {
            await service.deleteFile(post?.featuredImage as string);
        }
        // now update post
        const { title, content, slug, status } = data;
        const { userId } = post;
        const updatedPost = await service.updatePost(slug, {
            title,
            content,
            featuredImage: file?.$id as string,
            status,
            userId,
        });
        if (updatedPost) {
            return updatedPost;
        } else {
            return post;
        }
    }
);

// fetch all posts
export const fetchAllPosts = createAsyncThunk(
    "posts/fetchAllPosts",
    async () => {
        const response = await service.getPosts();
        return response.documents;
    }
);

// delete post
export const deletePost = createAsyncThunk(
    "posts/deletePost",
    async (post: Models.Document) => {
        const response = await service.deletePost(post.$id);
        if (response) {
            const responseDeleteFile = await service.deleteFile(
                post.featuredImage
            );
            if (responseDeleteFile) {
                return post;
            }
        }
    }
);

// posts slice
const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        resetPosts: (state) => {
            state.posts = [];
            state.status = "idle";
            state.error = "";
        },
        resetPostsStatus: (state) => {
            state.status = "idle";
        },
    },
    extraReducers: (builder) => {
        builder
            // addNewPost
            .addCase(addNewPost.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.error = "";
                state.posts = [...state.posts, action.payload as PostFromDB];
            })
            .addCase(addNewPost.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message as string;
            })

            // fetchAllPosts
            .addCase(fetchAllPosts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAllPosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.posts = action.payload;
                state.error = "";
            })
            .addCase(fetchAllPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message as string;
            })

            // updatePost
            .addCase(updatePost.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.error = "";
                const { $id } = action.payload as PostFromDB;
                const posts = state.posts.filter((post) => post.$id !== $id);
                state.posts = [...posts, action.payload as PostFromDB];
            })
            .addCase(updatePost.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message as string;
            })

            // deletePost
            .addCase(deletePost.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.error = "";
                const { $id } = action.payload as PostFromDB;
                const posts = state.posts.filter((post) => post.$id !== $id);
                state.posts = [...posts];
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message as string;
            });
    },
});

export const getAllPosts = (state: rootState) => state.posts.posts;
export const getPostsStatus = (state: rootState) => state.posts.status;
export const getPostsError = (state: rootState) => state.posts.error;
export const getSinglePostById = (state: rootState, postId: string) =>
    state.posts.posts?.find((post: PostFromDB) => post.$id === postId);

export const { resetPosts, resetPostsStatus } = postsSlice.actions;

export default postsSlice.reducer;
