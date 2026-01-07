import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Logo } from '@/components/ui/Logo';
import { supabase } from '@/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SignupScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const router = useRouter();
    const insets = useSafeAreaInsets();

    async function signUpWithEmail() {
        if (!agreed) {
            Alert.alert('Agreement Required', 'Please agree to the privacy policy and terms.');
            return;
        }
        setLoading(true);
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { username },
            },
        });

        if (error) {
            Alert.alert('Error', error.message);
            setLoading(false);
            return;
        }

        if (!session) Alert.alert('Check your inbox', 'Please check your inbox for email verification!');

        // Create profile
        if (session) {
            const { error: profileError } = await supabase
                .from('users')
                .insert({ id: session.user.id, username, email });

            if (profileError) {
                console.error(profileError);
            }
        }

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

                    {/* Logo & Header */}
                    <View className="mb-6">
                        <Logo className="items-start justify-start" textClassName="text-3xl" />
                    </View>

                    <Text className="text-3xl font-bold text-text mb-2 font-inter-bold">
                        Create Account 👋
                    </Text>
                    <Text className="text-textSecondary mb-8 text-base">
                        Please register on Snapback, where getting roasted is the service.
                    </Text>

                    {/* Form */}
                    <View className="space-y-4">
                        <Input
                            placeholder="Bruce Wayne"
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize="none"
                        />
                        <Input
                            placeholder="brucewayne27@suarasa.com"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <Input
                            placeholder="••••••••"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                            autoCapitalize="none"
                        />
                    </View>

                    {/* Terms Checkbox */}
                    <TouchableOpacity
                        className="flex-row items-center mt-4 mb-8"
                        onPress={() => setAgreed(!agreed)}
                    >
                        <View className={`w-6 h-6 rounded-md border-2 border-black mr-3 items-center justify-center ${agreed ? 'bg-black' : 'bg-white'}`}>
                            {agreed && <Ionicons name="checkmark" size={16} color="white" />}
                        </View>
                        <Text className="text-textSecondary text-sm">
                            I agree to privacy policy & terms
                        </Text>
                    </TouchableOpacity>

                    {/* Action Button */}
                    <Button
                        onPress={signUpWithEmail}
                        disabled={loading}
                        className="mb-8"
                    >
                        {loading ? 'Creating...' : 'Continue'}
                    </Button>

                    {/* Divider */}
                    <View className="flex-row items-center mb-8">
                        <View className="flex-1 h-[1px] bg-gray-200" />
                        <Text className="mx-4 text-gray-400">Or</Text>
                        <View className="flex-1 h-[1px] bg-gray-200" />
                    </View>

                    {/* Social Buttons */}
                    <View className="flex-row gap-4 justify-center">
                        <Button variant="google" className="w-20" />
                        <Button variant="apple" className="w-20" />
                    </View>

                    <View className="flex-row justify-center mt-8 gap-1">
                        <Text className="text-textSecondary">Already have an account?</Text>
                        <Link href="/login" asChild>
                            <Text className="text-primary font-bold">Sign in instead</Text>
                        </Link>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
