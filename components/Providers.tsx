import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../global.css';

const queryClient = new QueryClient();

export function Providers({ children }: PropsWithChildren) {
    const { setSession, setInitialized } = useAuthStore();

    useEffect(() => {
        const initializeAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            setInitialized(true);
        };

        initializeAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <SafeAreaProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </SafeAreaProvider>
    );
}
