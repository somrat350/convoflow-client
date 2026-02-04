import { Navigate } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import PageLoader from "../components/PageLoader";
import { useEffect } from "react";

const ChatPage = () => {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (isCheckingAuth) return <PageLoader />;
  if (!authUser) {
    return <Navigate to="/login" replace />;
  }
  return <div>Chat Page</div>;
};

export default ChatPage;
