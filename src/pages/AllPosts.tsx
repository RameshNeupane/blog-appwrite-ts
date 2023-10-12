import { Link } from "react-router-dom";
import { useAppSelector } from "@store/store";
import { Container, PostCard } from "@components/index";
import { getAllPosts, getPostsStatus } from "@store/slice/postsSlice";
import { getAuthStatus, getIsUserLoggedIn } from "@store/slice/authSlice";

const AllPosts: React.FC = () => {
    const posts = useAppSelector(getAllPosts);
    const isUserLoggedIn = useAppSelector(getIsUserLoggedIn);
    const postsStatus = useAppSelector(getPostsStatus);
    const authStatus = useAppSelector(getAuthStatus);

    if (postsStatus === "loading" || authStatus === "loading") {
        return (
            <div className="text-center text-xl font-medium">Loading...</div>
        );
    } else if (!isUserLoggedIn) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full flex flex-col items-center">
                            <h1 className="text-2xl font-bold">
                                You are not logged in. Login to read posts.
                            </h1>
                            <Link
                                to="/login"
                                className="block mt-6 text-lg bg-purple-400 w-max py-4 px-6 rounded-md hover:bg-purple-500 duration-200 ease-out"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        );
    } else {
        if (posts.length === 0) {
            return (
                <div className="p-2 w-full flex flex-col items-center">
                    <h1 className="text-2xl font-bold">No post to read.</h1>
                    <Link
                        to="/add-post"
                        className="block mt-6 text-lg bg-purple-400 w-max py-4 px-6 rounded-md hover:bg-purple-500 duration-200 ease-out"
                    >
                        Add New Post
                    </Link>
                </div>
            );
        } else {
            return (
                <div className="w-full py-8">
                    <Container>
                        <div className="relative gap-4 grid grid-col-1 sm:grid-cols-2 xl:grid-cols-3 justify-stretch">
                            {posts.map((post) => (
                                <div key={post.$id} className="p-2 w-full">
                                    <PostCard
                                        $id={post.$id}
                                        title={post.title}
                                        featuredImage={post.featuredImage}
                                    />
                                </div>
                            ))}
                        </div>
                    </Container>
                </div>
            );
        }
    }
};

export default AllPosts;
