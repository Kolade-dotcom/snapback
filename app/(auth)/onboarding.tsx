import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Dimensions, FlatList, Text, View } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const SLIDES = [
    {
        id: '1',
        emoji: '📸',
        title: 'Snap Your Task',
        description: 'Take a photo of what you need to do. We analyze it with AI to understand your mission.',
    },
    {
        id: '2',
        emoji: '🔥',
        title: 'Get Roasted',
        description: 'If you fail to complete your task on time, our AI will roast you mercilessly.',
    },
    {
        id: '3',
        emoji: '🏆',
        title: 'Level Up',
        description: 'Complete tasks to earn points, streaks, and avoid the shame of public failure.',
    },
];

export default function OnboardingScreen() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const { setHasSeenOnboarding } = useAuthStore();
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useSharedValue(0);
    const flatListRef = useRef<FlatList>(null);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
    });

    const handleNext = () => {
        if (currentIndex < SLIDES.length - 1) {
            flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
            setCurrentIndex(currentIndex + 1);
        } else {
            completeOnboarding();
        }
    };

    const completeOnboarding = () => {
        setHasSeenOnboarding(true);
        router.replace('/signup');
    };

    const PaginationDot = ({ index }: { index: number }) => {
        const animatedDotStyle = useAnimatedStyle(() => {
            const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
            const widthVal = interpolate(
                scrollX.value,
                inputRange,
                [8, 24, 8],
                Extrapolate.CLAMP
            );
            const opacity = interpolate(
                scrollX.value,
                inputRange,
                [0.4, 1, 0.4],
                Extrapolate.CLAMP
            );
            return {
                width: widthVal,
                opacity,
            };
        });

        return (
            <Animated.View
                className="h-2 rounded-full bg-primary mx-1"
                style={animatedDotStyle}
            />
        );
    };

    return (
        <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
            <View className="items-center pt-8 pb-4">
                <Logo showIcon={false} />
            </View>

            <Animated.FlatList
                ref={flatListRef}
                data={SLIDES}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                onMomentumScrollEnd={(event) => {
                    const index = Math.round(event.nativeEvent.contentOffset.x / width);
                    setCurrentIndex(index);
                }}
                renderItem={({ item }) => (
                    <View style={{ width }} className="flex-1 items-center justify-center px-8">
                        <View className="w-48 h-48 bg-surface rounded-full items-center justify-center border-2 border-black mb-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <Text className="text-8xl">{item.emoji}</Text>
                        </View>
                        <Text className="text-3xl font-black text-text text-center mb-4 font-inter-black">
                            {item.title}
                        </Text>
                        <Text className="text-textSecondary text-lg text-center font-inter-medium leading-7">
                            {item.description}
                        </Text>
                    </View>
                )}
            />

            <View className="p-8">
                <View className="flex-row justify-center mb-8 h-4 items-center">
                    {SLIDES.map((_, index) => (
                        <PaginationDot key={index} index={index} />
                    ))}
                </View>

                <Button onPress={handleNext} className="w-full">
                    {currentIndex === SLIDES.length - 1 ? "Get Started" : "Next"}
                </Button>

                {currentIndex < SLIDES.length - 1 && (
                    <View className="items-center mt-4">
                        <Button variant="google" className="w-full border-0 shadow-none h-auto bg-transparent" onPress={completeOnboarding} style={{ shadowOpacity: 0 }}>
                            <Text className="text-textSecondary font-bold">Skip</Text>
                        </Button>
                    </View>
                )}
            </View>
        </View>
    );
}
