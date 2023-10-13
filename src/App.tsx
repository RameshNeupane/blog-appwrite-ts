import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "@components/index";
import { fetchAllPosts } from "@store/slice/postsSlice";
import { useAppDispatch, useAppSelector } from "@store/store";
import {
    currentUser,
    getAuthStatus,
    getIsUserLoggedIn,
} from "@store/slice/authSlice";

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const isUserLoggedIn = useAppSelector(getIsUserLoggedIn);
    const authStatus = useAppSelector(getAuthStatus);

    useEffect(() => {
        // IFFE
        (async () => {
            if (!isUserLoggedIn) {
                await dispatch(currentUser());
            } else {
                await dispatch(fetchAllPosts());
            }
        })();
    }, [dispatch, isUserLoggedIn]);

    if (authStatus === "idle") return;

    return (
        <div className="relative min-w-screen min-h-screen flex flex-col justify-between">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default App;
