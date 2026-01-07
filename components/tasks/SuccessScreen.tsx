import { Button } from '@/components/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import Animated, { BounceIn, FadeIn } from 'react-native-reanimated';

interface SuccessScreenProps {
    roast: string; // Actually praise in this case
}

export default function SuccessScreen({ roast }: SuccessScreenProps) {
    const router = useRouter();

    return (
        <View className="flex-1 bg-success/20 items-center justify-center p-8">
            <Animated.View
                entering={BounceIn.duration(1000)}
                className="w-32 h-32 bg-success rounded-full items-center justify-center mb-8 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
                <Ionicons name="checkmark-sharp" size={64} color="white" />
            </Animated.View>

            <Animated.Text
                entering={FadeIn.delay(300)}
                className="text-4xl font-black text-black font-inter-black mb-4 text-center tracking-tighter"
            >
                REDEMPTION!
            </Animated.Text>

            <Animated.Text
                entering={FadeIn.delay(600)}
                className="text-lg font-inter-medium text-black/80 text-center mb-12"
            >
                "{roast}"
            </Animated.Text>

            <Animated.View entering={FadeIn.delay(900)} className="w-full">
                <Button
                    className="w-full bg-white border-black"
                    onPress={() => router.replace('/(tabs)')}
                >
                    <Text className="text-black font-bold">Back to Safety</Text>
                </Button>
            </Animated.View>
        </View>
    );
}
