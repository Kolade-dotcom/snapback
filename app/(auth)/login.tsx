import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Logo } from '@/components/ui/Logo';
import { supabase } from '@/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const insets = useSafeAreaInsets();

    async function signInWithEmail() {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) Alert.alert('Error', error.message);
        setLoading(false);
    }

    return (
        <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView contentContainerStyle={{ padding: 24 }}>
                    {/* Back Button */}
                    <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-surface rounded-xl items-center justify-center mb-6 shadow-sm border border-gray-100">
                        <Ionicons name="chevron-back" size={24} color="black" />
                    </TouchableOpacity>

                    <View className="mb-2">
                        <Logo className="items-start justify-start" textClassName="text-3xl" />
                    </View>

                    <Text className="text-3xl font-bold text-text mb-2 font-inter-bold">
                        Welcome Back 👋
                    </Text>
                    <Text className="text-textSecondary mb-8 text-base">
                        Ready for your daily roast?
                    </Text>

                    <View className="space-y-4 mb-8">
                        <Input
                            placeholder="email@address.com"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                        <Input
                            placeholder="••••••••"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                            autoCapitalize="none"
                        />
                    </View>

                    <Button
                        onPress={signInWithEmail}
                        disabled={loading}
                        className="mb-8"
                    >
                        {loading ? 'Signing in...' : 'Continue'}
                    </Button>

                    <View className="flex-row items-center mb-8">
                        <View className="flex-1 h-[1px] bg-gray-200" />
                        <Text className="mx-4 text-gray-400">Or</Text>
                        <View className="flex-1 h-[1px] bg-gray-200" />
                    </View>

                    <View className="flex-row gap-4 justify-center">
                        <Button variant="google" className="w-20" />
                        <Button variant="apple" className="w-20" />
                    </View>

                    <View className="flex-row justify-center mt-8 gap-1">
                        <Text className="text-textSecondary">Don't have an account?</Text>
                        <Link href="/signup" asChild>
                            <Text className="text-primary font-bold">Sign Up</Text>
                        </Link>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
