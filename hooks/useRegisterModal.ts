import { create } from "zustand";

interface UseRegisterModalContext {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useRegisterModal = create<UseRegisterModalContext>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
