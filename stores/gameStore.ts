import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface GameState {
    shameScore: number;
    redemptionCount: number;
    level: number;
    title: string;
    addShame: (amount: number) => void;
    redeem: (amount: number) => void;
    calculateLevel: () => void;
}

export const useGameStore = create<GameState>()(
    persist(
        (set, get) => ({
            shameScore: 50, // Start with average shame
            redemptionCount: 0,
            level: 1,
            title: "Filth Wizard",

            addShame: (amount) => {
                const newScore = Math.min(100, get().shameScore + amount);
                set({ shameScore: newScore });
                get().calculateLevel();
            },

            redeem: (amount) => {
                const newScore = Math.max(0, get().shameScore - amount);
                set({
                    shameScore: newScore,
                    redemptionCount: get().redemptionCount + 1
                });
                get().calculateLevel();
            },

            calculateLevel: () => {
                const { redemptionCount, shameScore } = get();
                let newLevel = 1;
                let newTitle = "Filth Wizard";

                if (redemptionCount > 5) { newLevel = 2; newTitle = "Toddler"; }
                if (redemptionCount > 10) { newLevel = 3; newTitle = "Responsible Adult"; }
                if (redemptionCount > 20) { newLevel = 4; newTitle = "Zen Master"; }

                // Shame overrides titles
                if (shameScore > 80) newTitle = "Absolute Disgrace";
                if (shameScore < 10) newTitle = "Clean Freak";

                set({ level: newLevel, title: newTitle });
            }
        }),
        {
            name: 'game-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
