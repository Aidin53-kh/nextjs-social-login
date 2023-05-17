import { create } from "zustand";

interface UseLoginModalContext {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useLoginModal = create<UseLoginModalContext>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
