import { useForm } from "react-hook-form";
import { ISignupData } from "src/types/auth.types";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Logo } from "@components/index";
import { useAppDispatch, useAppSelector } from "@store/store";
import {
    signup,
    getAuthStatus,
    getSignupError,
    resetSignupError,
    getIsUserLoggedIn,
} from "@store/slice/authSlice";

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const signupError = useAppSelector(getSignupError);
    const authStatus = useAppSelector(getAuthStatus);
    const isUserLoggedIn = useAppSelector(getIsUserLoggedIn);
    const { register, handleSubmit } = useForm<ISignupData>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const handleSignup = async (data: ISignupData) => {
        dispatch(resetSignupError());
        await dispatch(signup(data));
        if (isUserLoggedIn) {
            navigate("/");
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div
                className={`mx-auto w-full max-w-lg bg-purple-100 rounded-xl p-10 border border-black/10`}
            >
                <div className="mb-2 flex justify-center">
                    <span className="inline-flex justify-center w-full max-w-[100px]">
                        <Logo />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign up to create account
                </h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary text-purple-800 transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {signupError && (
                    <p className="text-red-600 mt-8 text-center">
                        {signupError}
                    </p>
                )}
                <form onSubmit={handleSubmit(handleSignup)}>
                    <div className="space-y-5">
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                                            value
                                        ) ||
                                        "Email address must be a valid address",
                                },
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button
                            disabled={authStatus === "loading"}
                            type="submit"
                            className="w-full hover:bg-blue-700 disabled:bg-blue-400"
                        >
                            {authStatus === "loading"
                                ? "Signing up..."
                                : "Sign up"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
