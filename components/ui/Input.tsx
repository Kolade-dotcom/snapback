import clsx from 'clsx';
import { Text, TextInput, TextInputProps, View } from 'react-native';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
}

export function Input({ style, label, error, className, ...props }: InputProps) {
    return (
        <View className="space-y-2 mb-4">
            <TextInput
                className={clsx(
                    "bg-white text-text rounded-2xl px-5 py-4 border-2 border-black text-lg font-inter-medium",
                    "focus:border-primary", // Optional focus state
                    error && "border-destructive",
                    className
                )}
                placeholderTextColor="#9CA3AF"
                style={style}
                {...props}
            />
            {error && <Text className="text-destructive text-sm ml-1">{error}</Text>}
        </View>
    );
}
