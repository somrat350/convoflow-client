import { Navigate } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import PageLoader from "../components/PageLoader";
import { useEffect } from "react";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";

const ChatPage = () => {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (isCheckingAuth) return <PageLoader />;
  if (!authUser) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="relative w-full max-w-6xl h-200">
      <BorderAnimatedContainer>
        {/* LEFT SIDE */}
        <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col">
          <ProfileHeader />

          <div className="flex-1 overflow-y-auto p-4 space-y-2"></div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm"></div>
      </BorderAnimatedContainer>
    </div>
  );
};

export default ChatPage;
