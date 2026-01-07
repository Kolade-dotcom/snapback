import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

interface RoastCardProps {
    score: number;
    roast: string;
}

export function RoastCard({ score, roast }: RoastCardProps) {
    return (
        <View className="bg-destructive/10 border-2 border-destructive rounded-3xl p-6 mb-6">
            <View className="flex-row items-center mb-4">
                <View className="w-12 h-12 bg-destructive rounded-full items-center justify-center mr-4 shadow-sm">
                    <Ionicons name="flame" size={24} color="white" />
                </View>
                <View>
                    <Text className="text-destructive font-bold uppercase tracking-widest text-xs">
                        Shame Score
                    </Text>
                    <Text className="text-4xl font-black text-destructive font-inter-black">
                        {score}%
                    </Text>
                </View>
            </View>

            <View className="bg-white p-4 rounded-xl border border-destructive/20 relative">
                {/* Quote icon decoration */}
                <Ionicons name="chatbubble-ellipses-outline" size={32} color="#FCA5A5" style={{ position: 'absolute', top: -10, left: 10, opacity: 0.5 }} />

                <Text className="text-xl text-black font-inter-medium italic leading-8 pt-4">
                    "{roast}"
                </Text>

                <View className="flex-row justify-end mt-2">
                    <Text className="text-textSecondary text-xs uppercase font-bold tracking-widest">
                        — AI Overlord
                    </Text>
                </View>
            </View>
        </View>
    );
}
