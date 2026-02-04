import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import PageLoader from "../components/PageLoader";
import { Link, Navigate } from "react-router";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import {
  LoaderIcon,
  LockIcon,
  MailIcon,
  MessageCircleIcon,
} from "lucide-react";

const LoginPage = () => {
  const { checkAuth, isCheckingAuth, authUser, isLoggingIn, loginUser } =
    useAuthStore();
  const { register, handleSubmit } = useForm();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const onSubmit = async (data) => {
    if (!/[a-z]/.test(data.password)) {
      toast.error("Password must contain lowercase.");
      return;
    } else if (!/[A-Z]/.test(data.password)) {
      toast.error("Password must contain Uppercase.");
      return;
    } else if (data.password.length < 6) {
      toast.error("Password must 6 letters.");
      return;
    }
    loginUser(data);
  };
  if (isCheckingAuth) return <PageLoader />;
  if (authUser) return <Navigate to="/chat" replace />;
  return (
    <div className="w-full flex items-center justify-center bg-slate-900">
      <div className="relative w-full max-w-6xl md:h-200 h-160">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row h-full md:items-center">
            {/* FORM COLUMN - LEFT SIDE */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                {/* HEADING TEXT */}
                <div className="text-center mb-8">
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">
                    Welcome Back
                  </h2>
                  <p className="text-slate-400">
                    Login to access to your account
                  </p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* EMAIL INPUT */}
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />

                      <input
                        type="email"
                        {...register("email")}
                        required
                        className="input"
                        placeholder="johndoe@gmail.com"
                      />
                    </div>
                  </div>

                  {/* PASSWORD INPUT */}
                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />

                      <input
                        type="password"
                        {...register("password")}
                        required
                        className="input"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button
                    className={`auth-btn ${isLoggingIn ? "btn-disabled" : ""}`}
                    type="submit"
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : (
                      "LogIn"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link to="/register" className="auth-link">
                    Don't have an account? Register
                  </Link>
                </div>
              </div>
            </div>

            {/* FORM ILLUSTRATION - RIGHT SIDE */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-linear-to-bl from-slate-800/20 to-transparent">
              <div>
                <img
                  src="/login.png"
                  alt="People using mobile devices"
                  className="w-full h-auto object-contain"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-cyan-400">
                    Connect anytime, anywhere
                  </h3>

                  <div className="mt-4 flex justify-center gap-4">
                    <span className="auth-badge">Free</span>
                    <span className="auth-badge">Easy Setup</span>
                    <span className="auth-badge">Private</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
};

export default LoginPage;
