import { FlatList, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MOCK_LEADERBOARD = [
    { id: '1', username: 'CleanQueen', redemptions: 142, shame: 5 },
    { id: '2', username: 'MrSparkle', redemptions: 98, shame: 12 },
    { id: '3', username: 'You', redemptions: 5, shame: 75, isMe: true }, // pulled from store ideally
    { id: '4', username: 'MessyMike', redemptions: 2, shame: 99 },
];

export default function LeaderboardScreen() {
    const insets = useSafeAreaInsets();

    const renderItem = ({ item, index }: { item: typeof MOCK_LEADERBOARD[0], index: number }) => (
        <View className={`flex-row items-center p-4 mb-3 rounded-2xl border-2 border-black ${item.isMe ? 'bg-primary/10' : 'bg-white'} shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
            <Text className="font-black text-xl w-8 text-center mr-2">{index + 1}</Text>
            <View className="w-10 h-10 bg-gray-200 rounded-full mr-3 items-center justify-center border border-black">
                <Text>👤</Text>
            </View>
            <View className="flex-1">
                <Text className="font-bold text-lg">{item.username}</Text>
                <Text className="text-xs text-gray-500 font-bold uppercase">{item.shame > 80 ? 'In Crisis' : 'Redeemed'}</Text>
            </View>
            <View className="items-end">
                <Text className="font-black text-lg">{item.redemptions}</Text>
                <Text className="text-xs">Fixed</Text>
            </View>
        </View>
    );

    return (
        <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
            <View className="p-6 pb-2">
                <Text className="text-4xl font-black uppercase tracking-tighter mb-2">Wall of Shame</Text>
                <Text className="font-bold text-textSecondary uppercase tracking-widest text-xs mb-6">Global Rankings</Text>
            </View>

            <FlatList
                data={MOCK_LEADERBOARD}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={{ padding: 24, paddingTop: 0 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}
