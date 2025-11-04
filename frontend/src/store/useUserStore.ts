import { create } from "zustand";

interface User {
    id: string;
    name: string;
    email: string;
    referralCode: string;
}

interface UserStore {
    user: User | null;
    token: string | null;
    setUser: (user: User, token: string) => void;
    logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    token: null,
    setUser: (user, token) => {
        localStorage.setItem("token", token);
        set({ user, token });
    },
    logout: () => {
        localStorage.removeItem("token");
        set({ user: null, token: null });
    },
}));
