import { getIsUserLoggedIn } from "@store/slice/authSlice";
import { useAppSelector } from "@store/store";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthLayoutProps {
    children: React.ReactNode;
    authentication?: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
    children,
    authentication = true,
}) => {
    const navigate = useNavigate();
    const isUserLoggedIn = useAppSelector(getIsUserLoggedIn);

    useEffect(() => {
        if (authentication && isUserLoggedIn !== authentication) {
            navigate("/login");
        } else if (!authentication && isUserLoggedIn !== authentication) {
            navigate("/");
        }
    }, [authentication, isUserLoggedIn, navigate]);
    return <>{children}</>;
};

export default AuthLayout;
