import { Ionicons } from '@expo/vector-icons';
import clsx from 'clsx';
import { Image, Text, ViewStyle } from 'react-native';
import { AnimatedPressable } from './AnimatedPressable';

interface ButtonProps {
    onPress?: () => void;
    children?: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'google' | 'apple';
    className?: string;
    style?: ViewStyle;
    disabled?: boolean;
}

export function Button({
    onPress,
    children,
    variant = 'primary',
    className,
    style,
    disabled
}: ButtonProps) {

    if (variant === 'google') {
        return (
            <AnimatedPressable
                onPress={onPress}
                disabled={disabled}
                className={clsx(
                    "bg-white border-2 border-black rounded-2xl h-14 items-center justify-center flex-row shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]",
                    className
                )}
                style={style}
            >
                <Image
                    source={{ uri: 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg' }} // We might need a local asset or icon here, using text G for now in standard icon sets or just color
                    style={{ width: 24, height: 24, marginRight: 8 }}
                />
                {/* Using a text fallback or FontAwesome if image fails logic isn't here, assuming we'll replace with SVG/Icon later. for now, let's use a simple View or Icon */}
                <Ionicons name="logo-google" size={24} color="black" />
            </AnimatedPressable>
        );
    }

    if (variant === 'apple') {
        return (
            <AnimatedPressable
                onPress={onPress}
                disabled={disabled}
                className={clsx(
                    "bg-white border-2 border-black rounded-2xl h-14 items-center justify-center flex-row shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]",
                    className
                )}
                style={style}
            >
                <Ionicons name="logo-apple" size={24} color="black" />
            </AnimatedPressable>
        );
    }

    if (variant === 'secondary') {
        return (
            <AnimatedPressable
                onPress={onPress}
                disabled={disabled}
                className={clsx(
                    "bg-white border-2 border-black rounded-2xl h-14 items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]",
                    disabled && "opacity-50",
                    className
                )}
                style={style}
            >
                <Text className="text-black font-bold text-lg font-inter-bold">
                    {children}
                </Text>
            </AnimatedPressable>
        );
    }

    return (
        <AnimatedPressable
            onPress={onPress}
            disabled={disabled}
            className={clsx(
                "bg-primary border-2 border-primary rounded-2xl h-14 items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]", // Subtle shadow on primary or keep it flat? Reference shows flat-ish primary but let's add depth if requested. Actually user said "btn... should have like a 3d file with a black under lay".
                "bg-primary border-transparent shadow-none", // Wait, the primary button in Bento often is flat or soft shadow. The REFERENCE image shows specific "Social" buttons having borders. The primary "Continue" is usually flat orange.
                // User request: "btn and some component should have like a 3d file with a black under lay". okay applying to primary too.
                "bg-primary border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]",
                disabled && "opacity-50",
                className
            )}
            style={style}
        >
            <Text className="text-white font-bold text-lg font-inter-bold">
                {children}
            </Text>
        </AnimatedPressable>
    );
}
