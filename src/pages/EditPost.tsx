import { useParams } from "react-router-dom";
import { Container, PostForm } from "../components";
import { rootState, useAppSelector } from "@store/store";
import { getSinglePostById } from "@store/slice/postsSlice";

const EditPost: React.FC = () => {
    const { slug } = useParams();
    const post = useAppSelector((state: rootState) =>
        getSinglePostById(state, slug as string)
    );

    return post ? (
        <div className="py-8">
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null;
};

export default EditPost;
