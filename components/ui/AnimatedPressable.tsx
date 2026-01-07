import { Pressable, PressableProps } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const AnimatedPressableComponent = Animated.createAnimatedComponent(Pressable);

interface AnimatedPressableProps extends PressableProps {
    scaleActive?: number;
}

export function AnimatedPressable({
    children,
    scaleActive = 0.96,
    style,
    ...props
}: AnimatedPressableProps) {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePressIn = () => {
        scale.value = withSpring(scaleActive, { damping: 15, stiffness: 300 });
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    };

    return (
        <AnimatedPressableComponent
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={[animatedStyle, style]}
            {...props}
        >
            {children}
        </AnimatedPressableComponent>
    );
}
