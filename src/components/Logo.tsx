import React from "react";
import logo from "@assets/logo.svg";

interface LogoProps {
    width?: string;
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ width = "70px", className = "" }) => {
    return (
        <img
            src={logo}
            alt="logo"
            width={width}
            className={`${className}`}
            title="blog-appwrite-ts"
        ></img>
    );
};

export default Logo;
