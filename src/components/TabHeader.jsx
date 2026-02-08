import { useChatStore } from "../store/useChatStore";

const TabHeader = () => {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="bg-transparent grid grid-cols-2 gap-1 p-2 w-full">
      <button
        onClick={() => setActiveTab("chats")}
        className={`py-1 border border-cyan-900 rounded-sm cursor-pointer ${
          activeTab === "chats"
            ? "bg-cyan-500/20 text-cyan-400"
            : "text-slate-400"
        }`}
      >
        Chats
      </button>

      <button
        onClick={() => setActiveTab("contacts")}
        className={`py-1 border border-cyan-900 rounded-sm cursor-pointer ${
          activeTab === "contacts"
            ? "bg-cyan-500/20 text-cyan-400"
            : "text-slate-400"
        }`}
      >
        Contacts
      </button>
    </div>
  );
};

export default TabHeader;
