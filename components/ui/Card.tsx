import clsx from 'clsx';
import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'highlight';
}

export function Card({ style, children, className, variant = 'default', ...props }: CardProps) {
    const variants = {
        default: "bg-surface border border-white/5",
        highlight: "bg-surfaceHighlight border border-secondary/30",
    };

    return (
        <View
            className={clsx(
                "rounded-3xl p-5 shadow-sm",
                variants[variant],
                className
            )}
            style={style}
            {...props}
        >
            {children}
        </View>
    );
}
