import { useEffect, useState } from "react";
import { useAppSelector } from "@store/store";
import { Link, NavLink } from "react-router-dom";
import { getIsUserLoggedIn } from "@store/slice/authSlice";
import { Avatar, Container, Logo } from "@components/index.ts";

const Header: React.FC = () => {
    const isUserLoggedIn = useAppSelector(getIsUserLoggedIn);
    const [showLink, setShowLink] = useState(true);

    const checkWindowWidth = () => {
        if (window.innerWidth < 640) {
            setShowLink(false);
        } else {
            setShowLink(true);
        }
    };

    useEffect(() => {
        checkWindowWidth();
    }, []);

    useEffect(() => {
        window.addEventListener("resize", checkWindowWidth);

        return () => {
            window.removeEventListener("resize", checkWindowWidth);
        };
    });

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true,
            show: true,
        },
        {
            name: "Login",
            slug: "/login",
            active: !isUserLoggedIn,
            show: showLink,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !isUserLoggedIn,
            show: showLink,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: isUserLoggedIn,
            show: showLink,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: isUserLoggedIn,
            show: showLink,
        },
    ];

    return (
        <header className="shadow bg-purple-500 h-20 sticky top-0 z-50">
            <Container>
                <nav className="flex h-full">
                    <div className="mr-4 h-full flex items-center justify-center">
                        <Link to="/">
                            <Logo
                                width="70px"
                                className=" p-2 rounded hover:bg-purple-300 transition-colors duration-200 ease-in"
                            />
                        </Link>
                    </div>
                    <ul className=" relative flex ml-auto gap-4 text-lg">
                        {navItems.map((item) =>
                            item.active ? (
                                item.show ? (
                                    <li key={item.name}>
                                        <NavLink
                                            to={item.slug}
                                            className={({ isActive }) =>
                                                `h-full px-4 flex justify-center items-center hover:bg-purple-300 transition-colors duration-200 ease-in
                                            ${
                                                isActive
                                                    ? "bg-purple-300 font-medium text-purple-950"
                                                    : ""
                                            }
                                            `
                                            }
                                        >
                                            {item.name}
                                        </NavLink>
                                    </li>
                                ) : null
                            ) : null
                        )}
                        <li className=" flex items-center">
                            <Avatar showLink={showLink} />
                        </li>
                    </ul>
                </nav>
            </Container>
        </header>
    );
};

export default Header;
