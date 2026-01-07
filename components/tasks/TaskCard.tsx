import { Image, Text, View } from 'react-native';
import { Card } from '../ui/Card';

// Temporary type until schema is fully integrated with types
interface TaskCardProps {
    task: {
        id: string;
        title: string;
        difficultyScore?: number | null;
        beforePhotoUrl?: string | null;
    };
}

export function TaskCard({ task }: TaskCardProps) {
    return (
        <Card className="mb-4 overflow-hidden">
            {task.beforePhotoUrl && (
                <Image
                    source={{ uri: task.beforePhotoUrl }}
                    className="w-full h-40 rounded-xl mb-3"
                    contentFit="cover"
                />
            )}
            <View>
                <Text className="text-white text-xl font-bold mb-1">{task.title}</Text>
                <Text className="text-accent font-semibold">{task.difficultyScore} Shame Credits</Text>
            </View>
        </Card>
    );
}
