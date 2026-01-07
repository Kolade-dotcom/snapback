import { LinearGradient } from 'expo-linear-gradient';
import { Image, Text, View } from 'react-native';
import { AnimatedPressable } from '../ui/AnimatedPressable';

interface SuperCardProps {
    task: {
        id: string;
        title: string;
        beforePhotoUrl?: string | null;
        difficultyScore?: number | null;
        status: string;
    };
    onPress: () => void;
}

export function SuperCard({ task, onPress }: SuperCardProps) {
    return (
        <AnimatedPressable
            onPress={onPress}
            className="mb-6 rounded-3xl overflow-hidden bg-surface border-2 border-primary/20"
            style={{ aspectRatio: 4 / 5 }}
        >
            {/* Background Image */}
            {task.beforePhotoUrl ? (
                <Image
                    source={{ uri: task.beforePhotoUrl }}
                    className="w-full h-full absolute inset-0"
                    resizeMode="cover"
                />
            ) : (
                <View className="w-full h-full bg-surfaceHighlight items-center justify-center">
                    <Text className="text-textSecondary">No Image</Text>
                </View>
            )}

            {/* Gradient Overlay */}
            <LinearGradient
                colors={['transparent', 'rgba(9, 9, 11, 0.95)']}
                locations={[0.4, 1]}
                className="absolute inset-0"
            />

            {/* Content */}
            <View className="absolute bottom-0 left-0 right-0 p-6">
                {/* Chips */}
                <View className="flex-row gap-2 mb-3">
                    {task.difficultyScore && (
                        <View className="bg-destructive/90 px-3 py-1 rounded-full">
                            <Text className="text-white text-xs font-bold uppercase tracking-wider">
                                Risk: {task.difficultyScore}%
                            </Text>
                        </View>
                    )}
                    <View className="bg-secondary/90 px-3 py-1 rounded-full">
                        <Text className="text-white text-xs font-bold uppercase tracking-wider">
                            {task.status}
                        </Text>
                    </View>
                </View>

                {/* Title */}
                <Text className="text-white text-3xl font-black leading-8 mb-2 font-inter-black">
                    {task.title.toUpperCase()}
                </Text>

                <Text className="text-textSecondary text-sm">
                    Tap to view roasts
                </Text>
            </View>
        </AnimatedPressable>
    );
}
