import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isRegistering: false,
  isLoggingIn: false,
  socket: null,
  onlineUsers: [],
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/api/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in auth checking:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  registerUser: async (userData) => {
    set({ isRegistering: true });
    try {
      const res = await axiosInstance.post("/api/auth/register", userData);
      set({ authUser: res.data });
      toast.success("Account created successful!");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message || "Registration failed");
    } finally {
      set({ isRegistering: false });
    }
  },
  loginUser: async (userData) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/api/auth/login", userData);
      set({ authUser: res.data });
      toast.success("Logged in successful!");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logoutUser: async () => {
    try {
      await axiosInstance.post("/api/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successful!");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message || "Logout failed");
    }
  },
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL, { withCredentials: true });
    socket.connect();
    set({ socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
