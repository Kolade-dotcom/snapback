import {
  Inter_400Regular,
  Inter_700Bold,
  Inter_900Black,
} from '@expo-google-fonts/inter';
import { JetBrainsMono_400Regular } from '@expo-google-fonts/jetbrains-mono';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { Providers } from '@/components/Providers';
import { useColorScheme } from '@/components/useColorScheme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Inter_900Black,
    JetBrainsMono_400Regular,
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

import { useAuthStore } from '@/stores/authStore';
import { useRouter, useSegments } from 'expo-router';

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { session, initialized } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!initialized) return;

    const inAuthGroup = segments[0] === '(auth)';
    const viewingOnboarding = segments[1] === 'onboarding';

    if (!session && !inAuthGroup) {
      // Redirect to sign-in page if accessing protected route
      router.replace('/(auth)/login');
    } else if (session && inAuthGroup) {
      // Redirect to home if logged in and trying to access auth screens
      router.replace('/(tabs)');
    } else if (!session && inAuthGroup && !viewingOnboarding && !useAuthStore.getState().hasSeenOnboarding) {
      // Redirect to onboarding if not seen yet AND not logged in AND not already there
      router.replace('/(auth)/onboarding');
    }
  }, [session, segments, initialized]);

  return (
    <Providers>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </ThemeProvider>
    </Providers>
  );
}
