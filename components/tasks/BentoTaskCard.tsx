import clsx from 'clsx';
import { Text, View } from 'react-native';
import { AnimatedPressable } from '../ui/AnimatedPressable';

interface BentoTaskCardProps {
    task: {
        id: string;
        title: string;
        status: string;
        difficultyScore?: number | null;
    };
    onPress: () => void;
}

export function BentoTaskCard({ task, onPress }: BentoTaskCardProps) {
    // Mocking progress based on difficulty or random for visual fidelity to reference
    const progress = task.difficultyScore || 0;

    return (
        <AnimatedPressable
            onPress={onPress}
            className="mb-4 bg-white border-2 border-black rounded-3xl p-5 flex-row items-center justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
        >
            <View className="flex-1 mr-4">
                <Text className="text-lg font-bold text-text font-inter-bold mb-1" numberOfLines={1}>
                    {task.title}
                </Text>
                <Text className="text-textSecondary text-sm font-inter-medium">
                    🔥 Risk Level: {progress}%
                </Text>
            </View>

            {/* Circular Progress Indicator (Mock Visual) */}
            <View className="w-12 h-12 rounded-full border-4 border-gray-100 items-center justify-center relative">
                <View className={clsx(
                    "absolute inset-0 rounded-full border-4 border-primary opacity-25"
                )} />
                <Text className="text-[10px] font-bold text-text">{progress}%</Text>
            </View>
        </AnimatedPressable>
    );
}
