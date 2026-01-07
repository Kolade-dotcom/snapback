import { create } from 'zustand';

interface CreditState {
    totalCredits: number;
    currentStreak: number;
    setCredits: (amount: number) => void;
    incrementCredits: (amount: number) => void;
    setStreak: (streak: number) => void;
}

export const useCreditStore = create<CreditState>((set) => ({
    totalCredits: 0,
    currentStreak: 0,
    setCredits: (amount) => set({ totalCredits: amount }),
    incrementCredits: (amount) => set((state) => ({ totalCredits: state.totalCredits + amount })),
    setStreak: (streak) => set({ currentStreak: streak }),
}));
