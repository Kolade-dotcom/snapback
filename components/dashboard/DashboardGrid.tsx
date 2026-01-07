import { Ionicons } from '@expo/vector-icons';
import clsx from 'clsx';
import { Text, View } from 'react-native';

interface StatCardProps {
    title: string;
    count: number | string;
    color: string;
    icon: keyof typeof Ionicons.glyphMap;
    className?: string;
}

function StatCard({ title, count, color, icon, className }: StatCardProps) {
    // Snapback Themed Colors
    let bgClass = "bg-white border-2 border-black";
    let textClass = "text-black";
    let iconBgClass = "bg-black/10";
    let iconColor = "black";

    if (color === 'primary') {
        bgClass = "bg-primary border-2 border-black";
        textClass = "text-white";
        iconBgClass = "bg-white/20";
        iconColor = "white";
    } else if (color === 'dark') {
        bgClass = "bg-black";
        textClass = "text-white";
        iconBgClass = "bg-white/20";
        iconColor = "white";
    }

    return (
        <View className={clsx(`flex-1 rounded-3xl p-4 mr-3 mb-3 h-32 justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`, bgClass, className)}>
            <View className={clsx("w-8 h-8 rounded-full items-center justify-center", iconBgClass)}>
                <Ionicons name={icon} size={16} color={iconColor} />
            </View>
            <View>
                <Text className={clsx("font-bold text-2xl font-inter-black", textClass)}>{count}</Text>
                <Text className={clsx("font-bold text-xs uppercase tracking-wider opacity-80", textClass)}>{title}</Text>
            </View>
        </View>
    );
}

interface DashboardGridProps {
    stats: {
        pendingRoasts: number;
        shameLevel: number;
        streak: number;
        completed: number;
    };
}

export function DashboardGrid({ stats }: DashboardGridProps) {
    return (
        <View className="mb-6">
            <View className="flex-row">
                <StatCard
                    title="Pending Roasts"
                    count={stats.pendingRoasts}
                    color="primary"
                    icon="flame"
                />
                <StatCard
                    title="Shame Level"
                    count={`${stats.shameLevel}%`}
                    color="white"
                    icon="skull"
                />
            </View>
            <View className="flex-row">
                <StatCard
                    title="Active Streak"
                    count={`${stats.streak} 🔥`}
                    color="dark"
                    icon="trending-up"
                />
                <StatCard
                    title="Redeemed"
                    count={stats.completed}
                    color="white"
                    icon="trophy"
                />
            </View>
        </View>
    );
}
