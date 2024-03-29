import parse from "html-react-parser";
import service from "@appwrite/service";
import { PostFromDB } from "src/types/posts.types";
import { getUserData } from "@store/slice/authSlice";
import { Button, Container } from "@components/index";
import { Link, useNavigate, useParams } from "react-router-dom";
import { rootState, useAppDispatch, useAppSelector } from "@store/store";
import {
    deletePost,
    getPostsStatus,
    getSinglePostById,
} from "@store/slice/postsSlice";

const Post: React.FC = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const post = useAppSelector((state: rootState) =>
        getSinglePostById(state, slug as string)
    ) as PostFromDB;
    const postsStatus = useAppSelector(getPostsStatus);
    const userData = useAppSelector(getUserData);

    // check author
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    const handleDelete = async () => {
        await dispatch(deletePost(post));
        navigate("/");
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={service.getFilePreview(post.featuredImage).href}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button
                                    bgColor="bg-green-600"
                                    className="mr-3 hover:bg-green-700"
                                >
                                    Edit
                                </Button>
                            </Link>
                            <Button
                                disabled={postsStatus === "loading"}
                                bgColor="bg-red-600 hover:bg-red-700 disabled:bg-red-400 "
                                onClick={handleDelete}
                            >
                                {postsStatus === "loading"
                                    ? "Deleting..."
                                    : "Delete"}
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">{parse(post?.content)}</div>
            </Container>
        </div>
    ) : (
        <div className="text-center text-xl font-medium">Loading...</div>
    );
};

export default Post;
