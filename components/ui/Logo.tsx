import clsx from 'clsx';
import { Text, TextProps, View } from 'react-native';

interface LogoProps extends TextProps {
    className?: string; // For container if needed, though this outputs Text primarily
    textClassName?: string;
    showIcon?: boolean;
}

export function Logo({ className, textClassName, showIcon = true, ...props }: LogoProps) {
    return (
        <View className={clsx("flex-row items-center justify-center", className)}>
            {showIcon && <Text className="text-4xl mr-2">🔥</Text>}
            <Text
                className={clsx("text-4xl font-black text-text font-inter-black tracking-tighter", textClassName)}
                {...props}
            >
                Snap<Text className="text-primary">back</Text>
            </Text>
        </View>
    );
}
