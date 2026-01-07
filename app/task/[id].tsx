import { RoastCard } from '@/components/tasks/RoastCard';
import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ActivityIndicator, Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TaskDetailScreen() {
    const { id } = useLocalSearchParams();
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const queryClient = useQueryClient();

    const { data: task, isLoading, error } = useQuery({
        queryKey: ['task', id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('tasks')
                .select('*')
                .eq('id', id)
                .single();
            if (error) throw error;
            return data;
        },
        enabled: !!id,
    });

    const deleteMutation = useMutation({
        mutationFn: async () => {
            const { error } = await supabase.from('tasks').delete().eq('id', id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            router.back();
        },
        onError: (err) => Alert.alert('Error', err.message),
    });

    const completeMutation = useMutation({
        mutationFn: async () => {
            const { error } = await supabase
                .from('tasks')
                .update({ status: 'completed' })
                .eq('id', id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            queryClient.invalidateQueries({ queryKey: ['task', id] });
            Alert.alert('Nice!', 'You survived another day.');
        },
        onError: (err) => Alert.alert('Error', err.message),
    });

    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center bg-background">
                <ActivityIndicator size="large" color="#FF6B6B" testID="loading-indicator" />
            </View>
        );
    }

    if (error || !task) {
        return (
            <View className="flex-1 justify-center items-center bg-background px-8">
                <Text className="text-lg font-bold text-center">Task not found or has been obliterated.</Text>
                <Button onPress={() => router.back()} className="mt-4">Go Back</Button>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white">
            {/* Header Image or Placeholder */}
            {task.before_photo_url ? ( // Assuming this field exists from previous steps, otherwise standard placeholder
                <Image
                    source={{ uri: task.before_photo_url }}
                    className="w-full h-80 absolute top-0"
                    resizeMode="cover"
                />
            ) : (
                <View className="w-full h-80 absolute top-0 bg-gray-900 items-center justify-center">
                    <Text className="text-white text-6xl">💩</Text>
                </View>
            )}

            {/* Content ScrollView */}
            <ScrollView
                contentContainerStyle={{
                    paddingTop: 280, // Allow space for header
                    paddingBottom: 120, // Space for bottom actions
                    paddingHorizontal: 24
                }}
            >
                {/* Main Card */}
                <View className="bg-white rounded-3xl p-6 shadow-[0px_-4px_20px_rgba(0,0,0,0.1)] mb-6 border-2 border-black">
                    <View className="flex-row justify-between items-start mb-4">
                        <Text className="text-3xl font-black text-text font-inter-black flex-1 mr-4">
                            {task.title.toUpperCase()}
                        </Text>

                        <View className={`px-3 py-1 rounded-full border border-black ${task.status === 'completed' ? 'bg-success' : 'bg-primary'}`}>
                            <Text className="font-bold text-xs uppercase text-white">
                                {task.status}
                            </Text>
                        </View>
                    </View>

                    <Text className="text-textSecondary font-inter-medium mb-6">
                        Created on {new Date(task.created_at).toLocaleDateString()}
                    </Text>

                    <RoastCard score={task.difficulty_score} roast={task.roast} />
                </View>
            </ScrollView>

            {/* Navigation Header (Absolute) */}
            <View className="absolute top-0 left-0 right-0 flex-row justify-between px-6 z-10" style={{ paddingTop: insets.top }}>
                <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-white/90 backdrop-blur rounded-full items-center justify-center border border-black/10 shadow-sm">
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    Alert.alert('Delete Task?', 'Are you sure you want to give up?', [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Delete', style: 'destructive', onPress: () => deleteMutation.mutate() }
                    ])
                }} className="w-10 h-10 bg-white/90 backdrop-blur rounded-full items-center justify-center border border-destructive/20 shadow-sm">
                    <Ionicons name="trash-outline" size={20} color="#F43F5E" />
                </TouchableOpacity>
            </View>

            {/* Bottom Actions (Absolute) */}
            <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-6 pt-4 pb-8 shadow-lg flex-row gap-4">
                {task.status !== 'completed' && (
                    <Button
                        className="flex-1 bg-success border-black"
                        onPress={() => router.push(`/task/${id}/complete` as any)}
                    >
                        Mark Complete
                    </Button>
                )}
                {task.status === 'completed' && (
                    <View className="flex-1 items-center justify-center py-4 bg-gray-100 rounded-2xl border-2 border-gray-200">
                        <Text className="font-bold text-gray-500">Task Completed 🎉</Text>
                    </View>
                )}
            </View>
        </View>
    );
}
