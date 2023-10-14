import service from "@appwrite/service";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PostFromDB } from "src/types/posts.types";
import { getUserData } from "@store/slice/authSlice";
import { IPostFormData } from "src/types/posts.types";
import { useAppDispatch, useAppSelector } from "@store/store";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Input, RealTimeEditor, Select } from "@components/index";
import {
    addNewPost,
    updatePost,
    getPostsStatus,
} from "@store/slice/postsSlice";

interface PostFormProps {
    post?: PostFromDB;
}

const PostForm: React.FC<PostFormProps> = ({ post }) => {
    const { register, handleSubmit, control, watch, setValue, getValues } =
        useForm<IPostFormData>({
            defaultValues: {
                title: post?.title || "",
                slug: post?.$id || "",
                content: post?.content || "",
                status: post?.status || "active",
            },
        });

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userData = useAppSelector(getUserData);
    const postsStatus = useAppSelector(getPostsStatus);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const submitPost = async (data: IPostFormData) => {
        setIsLoading(true);

        // if there is a post then update the post else create new post
        if (post) {
            await dispatch(updatePost({ post, data }));
            setIsLoading(false);
            if (!isLoading) {
                navigate(`/post/${data.slug}`);
            }
        } else {
            await dispatch(
                addNewPost({ data, userId: userData?.$id as string })
            );
            setIsLoading(false);
            if (!isLoading && postsStatus == "succeeded") {
                navigate(`/post/${data.slug}`);
            }
        }
    };

    // transform slug
    const transformSlug = useCallback((value: string) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/--+/g, "-");
        }

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (!post) {
                if (name === "title") {
                    setValue("slug", transformSlug(value?.title as string), {
                        shouldValidate: true,
                    });
                }
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [watch, transformSlug, setValue, post]);

    // button text
    let btnText = "";
    if (post) {
        btnText = "Update";
        if (isLoading) {
            btnText = "Updating...";
        }
    } else {
        btnText = "Publish";
        if (isLoading) {
            btnText += "ing...";
        }
    }

    return (
        <form
            onSubmit={handleSubmit(submitPost)}
            className="flex items-start flex-col lg:flex-row gap-4 "
        >
            <div className="w-full lg:w-2/3">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    readOnly={Boolean(post)}
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", transformSlug(e.currentTarget.value), {
                            shouldValidate: true,
                        });
                    }}
                />
                <RealTimeEditor
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>
            <div className="w-full lg:w-1/3">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={
                                service.getFilePreview(
                                    post?.featuredImage as string
                                ).href
                            }
                            alt={post?.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button
                    disabled={isLoading}
                    type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    className={`w-full ${
                        post
                            ? "hover:bg-green-600 disabled:bg-green-400"
                            : "hover:bg-blue-700 disabled:bg-blue-400"
                    }`}
                >
                    {btnText}
                </Button>
            </div>
        </form>
    );
};

export default PostForm;
