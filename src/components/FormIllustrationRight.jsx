import { useLocation } from "react-router";

const FormIllustrationRight = () => {
  const location = useLocation();

  return (
    <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-linear-to-bl from-slate-800/20 to-transparent">
      <div>
        <img
          src={location.pathname === "/login" ? "/login.png" : "/register.png"}
          alt="People using mobile devices"
          className="w-full h-auto object-contain"
        />
        <div className="mt-6 text-center">
          <h3 className="text-xl font-medium text-cyan-400">
            {location.pathname === "/login"
              ? "Connect anytime, anywhere"
              : "Start Your Journey Today"}
          </h3>

          <div className="mt-4 flex justify-center gap-4">
            <span className="auth-badge">Free</span>
            <span className="auth-badge">Easy Setup</span>
            <span className="auth-badge">Private</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormIllustrationRight;
