import AsyncStorage from '@react-native-async-storage/async-storage';
import { Session, User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
    session: Session | null;
    user: User | null;
    initialized: boolean;
    hasSeenOnboarding: boolean;
    setSession: (session: Session | null) => void;
    signOut: () => void;
    setInitialized: (initialized: boolean) => void;
    setHasSeenOnboarding: (hasSeen: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            session: null,
            user: null, // Note: Persistence might not perfectly handle complex objects like Session/User without custom serialization, but usually works for basicAuth.  Ideally, session is re-hydrated from Supabase, but keeping it here helps with sync.
            initialized: false,
            hasSeenOnboarding: false,
            setSession: (session) => set({ session, user: session?.user ?? null, initialized: true }),
            signOut: () => set({ session: null, user: null }),
            setInitialized: (initialized) => set({ initialized }),
            setHasSeenOnboarding: (hasSeen) => set({ hasSeenOnboarding: hasSeen }),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({ hasSeenOnboarding: state.hasSeenOnboarding }), // Only persist hasSeenOnboarding. Session is managed by Supabase/AsyncStorage separately
        }
    )
);
