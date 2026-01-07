import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/stores/authStore';
import { useGameStore } from '@/stores/gameStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen() {
    const { user, signOut } = useAuthStore();
    const { shameScore, redemptionCount, title, level } = useGameStore();
    const insets = useSafeAreaInsets();
    const router = useRouter();

    const username = user?.user_metadata?.username || "Victim";

    const handleSignOut = async () => {
        await signOut();
        router.replace('/(auth)/login');
    };

    return (
        <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 24, paddingTop: insets.top + 20 }}>

            {/* Header / Avatar */}
            <View className="items-center mb-8">
                <View className="w-32 h-32 bg-surface border-4 border-black rounded-full items-center justify-center mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <Text className="text-6xl">🤡</Text>
                    {/* Replace with actual avatar later */}
                </View>
                <Text className="text-4xl font-black text-black font-inter-black tracking-tighter uppercase text-center">
                    {username}
                </Text>
                <View className="bg-black px-4 py-1 rounded-full mt-2">
                    <Text className="text-white font-bold uppercase tracking-widest text-xs">
                        {title} • Lvl {level}
                    </Text>
                </View>
            </View>

            {/* Stats Grid */}
            <View className="flex-row gap-4 mb-8">
                <View className="flex-1 bg-white border-2 border-black rounded-3xl p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] items-center">
                    <View className="w-10 h-10 bg-destructive/10 rounded-full items-center justify-center mb-2">
                        <Ionicons name="skull" size={20} color="#EF4444" />
                    </View>
                    <Text className="text-3xl font-black text-black font-inter-black">{shameScore}%</Text>
                    <Text className="text-xs font-bold text-textSecondary uppercase tracking-widest">Shame</Text>
                </View>

                <View className="flex-1 bg-black border-2 border-black rounded-3xl p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] items-center">
                    <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mb-2">
                        <Ionicons name="trophy" size={20} color="white" />
                    </View>
                    <Text className="text-3xl font-black text-white font-inter-black">{redemptionCount}</Text>
                    <Text className="text-xs font-bold text-white/70 uppercase tracking-widest">Fixed</Text>
                </View>
            </View>

            {/* Badges / Inventory (Placeholder) */}
            <View className="mb-8">
                <Text className="text-lg font-bold text-black mb-4 font-inter-bold uppercase tracking-widest">Badges of Shame</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-3">
                    {[1, 2, 3].map((i) => (
                        <View key={i} className="w-20 h-20 bg-gray-100 border-2 border-black/10 rounded-2xl items-center justify-center mr-2">
                            <Ionicons name="lock-closed" size={24} color="#9CA3AF" />
                        </View>
                    ))}
                </ScrollView>
            </View>

            {/* Settings / Actions */}
            <View className="gap-4">
                <TouchableOpacity className="flex-row items-center justify-between p-4 bg-white border-2 border-black rounded-2xl">
                    <View className="flex-row items-center gap-3">
                        <Ionicons name="settings-outline" size={24} color="black" />
                        <Text className="font-bold text-lg">Settings</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color="black" />
                </TouchableOpacity>

                <Button
                    variant="secondary"
                    className="bg-white border-black"
                    onPress={handleSignOut}
                >
                    <Text className="text-black font-bold">Log Out</Text>
                </Button>
            </View>

        </ScrollView>
    );
}
