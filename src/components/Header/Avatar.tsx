import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import defaultUserIcon from "@assets/user-alien.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/store";
import {
    getAuthStatus,
    getIsUserLoggedIn,
    getUserData,
    logout,
} from "@store/slice/authSlice";

interface AvatarProps {
    showLink: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ showLink }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userData = useAppSelector(getUserData);
    const authStatus = useAppSelector(getAuthStatus);
    const isUserLoggedIn = useAppSelector(getIsUserLoggedIn);

    const handleLogout = async () => {
        await dispatch(logout());
        navigate("/");
    };

    return (
        <Menu as="div" className="group relative z-50">
            <Menu.Button
                className="flex justify-center items-center rounded-full border-4 border-white group-hover:border-purple-300 transition-colors duration-200 ease-in"
                title="Menu"
            >
                <img
                    src={isUserLoggedIn ? userData.avatarURL : defaultUserIcon}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="bg-white rounded-full"
                />
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 mt-2 w-max origin-top-right px-4 py-3 bg-purple-300 border-2 border-black/10  rounded-md flex flex-col">
                    {isUserLoggedIn ? (
                        <>
                            <Menu.Item>
                                {() => (
                                    <div className="flex flex-col border-b-2 border-b-black/20 pb-3 mb-3">
                                        <span className="inline-block font-normal truncate text-base">
                                            {userData.name}
                                        </span>
                                        <span className="inline-block font-normal truncate text-base">
                                            {userData.email}
                                        </span>
                                    </div>
                                )}
                            </Menu.Item>
                            {!showLink ? (
                                <div className=" w-full flex flex-col gap-3 pb-3">
                                    <Menu.Item>
                                        {() => (
                                            <NavLink
                                                to="/all-posts"
                                                className={({ isActive }) =>
                                                    `w-full block p-2 border border-purple-500 hover:bg-purple-500 text-center rounded-md text-base transition-colors duration-200 ease-in disabled:cursor-not-allowed ${
                                                        isActive
                                                            ? "bg-purple-600 font-medium text-purple-950"
                                                            : ""
                                                    }
                                        `
                                                }
                                            >
                                                All Posts
                                            </NavLink>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {() => (
                                            <NavLink
                                                to="/add-post"
                                                className={({ isActive }) =>
                                                    `w-full block p-2 border border-purple-500 hover:bg-purple-500 text-center rounded-md text-base transition-colors duration-200 ease-in disabled:cursor-not-allowed ${
                                                        isActive
                                                            ? "bg-purple-600 font-medium text-purple-950"
                                                            : ""
                                                    }
                                        `
                                                }
                                            >
                                                Add Post
                                            </NavLink>
                                        )}
                                    </Menu.Item>
                                </div>
                            ) : null}
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        disabled={authStatus === "loading"}
                                        onClick={handleLogout}
                                        className={`w-full p-2 border border-purple-500 rounded-md text-base transition-colors duration-200 ease-in disabled:cursor-not-allowed ${
                                            active && "bg-purple-500"
                                        }`}
                                    >
                                        Sign out
                                    </button>
                                )}
                            </Menu.Item>
                        </>
                    ) : (
                        <>
                            <Menu.Item>
                                {() => (
                                    <div className="inline-block">
                                        You are not logged in!
                                    </div>
                                )}
                            </Menu.Item>
                            {!showLink ? (
                                <div className=" w-full flex flex-col gap-3 border-t-2 border-t-black/20 pt-3 mt-2">
                                    <Menu.Item>
                                        {() => (
                                            <NavLink
                                                to="/login"
                                                className={({ isActive }) =>
                                                    `w-full block p-2 border border-purple-500 hover:bg-purple-500 text-center rounded-md text-base transition-colors duration-200 ease-in disabled:cursor-not-allowed ${
                                                        isActive
                                                            ? "bg-purple-600 font-medium text-purple-950"
                                                            : ""
                                                    }
                                        `
                                                }
                                            >
                                                Login
                                            </NavLink>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {() => (
                                            <NavLink
                                                to="/signup"
                                                className={({ isActive }) =>
                                                    `w-full block p-2 border border-purple-500 hover:bg-purple-500 text-center rounded-md text-base transition-colors duration-200 ease-in disabled:cursor-not-allowed ${
                                                        isActive
                                                            ? "bg-purple-600 font-medium text-purple-950"
                                                            : ""
                                                    }
                                        `
                                                }
                                            >
                                                Sign up
                                            </NavLink>
                                        )}
                                    </Menu.Item>
                                </div>
                            ) : null}
                        </>
                    )}
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default Avatar;
