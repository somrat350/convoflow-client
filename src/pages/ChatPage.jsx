import { Navigate } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import PageLoader from "../components/PageLoader";
import { useEffect } from "react";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import TabHeader from "../components/TabHeader";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import { useChatStore } from "../store/useChatStore";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

const ChatPage = () => {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();
  const { activeTab, selectedUser } = useChatStore();
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
          <TabHeader />
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {activeTab === "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>
      </BorderAnimatedContainer>
    </div>
  );
};

export default ChatPage;
