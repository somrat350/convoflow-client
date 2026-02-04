import { useForm } from "react-hook-form";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import {
  LoaderIcon,
  LockIcon,
  MailIcon,
  MessageCircleIcon,
  UserIcon,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link, Navigate } from "react-router";
import PageLoader from "../components/PageLoader";
import toast from "react-hot-toast";
import { useEffect } from "react";

const RegisterPage = () => {
  const { checkAuth, isCheckingAuth, authUser, isRegistering, registerUser } =
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
    registerUser(data);
  };
  if (isCheckingAuth) return <PageLoader />;
  if (authUser) return <Navigate to="/chat" replace />;
  return (
    <div className="w-full flex items-center justify-center bg-slate-900">
      <div className="relative w-full max-w-6xl md:h-200 h-160">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row h-full md:items-center">
            {/* FORM COLUMN - LEFT SIDE */}
            <div className="md:w-1/2 p-4 lg:p-8 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                {/* HEADING TEXT */}
                <div className="text-center mb-8">
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">
                    Create Account
                  </h2>
                  <p className="text-slate-400">Sign up for a new account</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* FULL NAME */}
                  <div>
                    <label className="auth-input-label">Full Name</label>
                    <div className="relative">
                      <UserIcon className="auth-input-icon" />

                      <input
                        type="text"
                        required
                        {...register("name")}
                        className="input"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  {/* EMAIL INPUT */}
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />

                      <input
                        type="email"
                        required
                        {...register("email")}
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
                        required
                        {...register("password")}
                        className="input"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button
                    className={`auth-btn ${isRegistering ? "btn-disabled" : ""}`}
                    type="submit"
                    disabled={isRegistering}
                  >
                    {isRegistering ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link to="/login" className="auth-link">
                    Already have an account? Login
                  </Link>
                </div>
              </div>
            </div>

            {/* FORM ILLUSTRATION - RIGHT SIDE */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-3 lg:p-6 bg-linear-to-bl from-slate-800/20 to-transparent">
              <div>
                <img
                  src="/register.png"
                  alt="People using mobile devices"
                  className="w-full h-auto object-contain"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-cyan-400">
                    Start Your Journey Today
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

export default RegisterPage;
