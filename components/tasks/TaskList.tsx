import { useRouter } from 'expo-router';
import { FlatList, Text, View } from 'react-native';
import { SuperCard } from './SuperCard';

interface TaskListProps {
    tasks: any[];
}

export function TaskList({ tasks }: TaskListProps) {
    const router = useRouter();

    if (tasks.length === 0) {
        return (
            <View className="flex-1 justify-center items-center p-8">
                <Text className="text-white text-lg font-bold text-center">No tasks yet!</Text>
                <Text className="text-textSecondary text-center mt-2">
                    You're either extremely productive or lying to yourself.
                </Text>
            </View>
        );
    }

    return (
        <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <SuperCard
                    task={item}
                    onPress={() => router.push(`/task/${item.id}` as any)}
                />
            )}
            contentContainerStyle={{ padding: 16 }}
        />
    );
}
