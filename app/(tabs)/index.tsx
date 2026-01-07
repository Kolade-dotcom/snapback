import { DashboardGrid } from '@/components/dashboard/DashboardGrid';
import { BentoTaskCard } from '@/components/tasks/BentoTaskCard';
import { AnimatedPressable } from '@/components/ui/AnimatedPressable';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, signOut } = useAuthStore();
  const username = user?.user_metadata?.username || "Victim";
  const [refreshing, setRefreshing] = useState(false);

  const { data: tasks, isLoading, refetch } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const handleSignOut = async () => {
    await signOut();
    router.replace('/(auth)/login');
  };

  // Mock Stats Calculation based on tasks
  // Shame Level = Average difficulty of pending tasks? Or 100% - completion rate?
  // For MVP: random or basic.
  const pendingTasks = tasks?.filter(t => t.status === 'pending') || [];
  const completedTasks = tasks?.filter(t => t.status === 'completed') || [];

  const stats = {
    pendingRoasts: pendingTasks.length,
    shameLevel: pendingTasks.reduce((acc, t) => acc + (t.difficulty_score || 0), 0) / (pendingTasks.length || 1),
    streak: 3, // Mock streak
    completed: completedTasks.length,
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <ScrollView
        contentContainerStyle={{ padding: 24 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FF6B6B" />
        }
      >

        {/* Header */}
        <View className="flex-row justify-between items-center mb-8">
          <View>
            <Text className="text-3xl font-black text-text font-inter-black tracking-tighter">
              Hi, {username} 💀
            </Text>
            <Text className="text-textSecondary font-inter-medium">
              Ready to suffer?
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleSignOut}
            className="w-10 h-10 bg-white rounded-xl items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none"
          >
            <Ionicons name="log-out-outline" size={20} color="black" />
          </TouchableOpacity>
        </View>

        {/* Dashboard Grid */}
        <DashboardGrid stats={{
          pendingRoasts: stats.pendingRoasts,
          shameLevel: Math.round(stats.shameLevel),
          streak: stats.streak,
          completed: stats.completed
        }} />

        {/* Recent Task Header */}
        <Text className="text-lg font-bold text-text mb-4 font-inter-bold uppercase tracking-widest">
          Pending Dooms
        </Text>

        {/* Task List */}
        {isLoading ? (
          <Text>Loading...</Text>
        ) : tasks?.length === 0 ? (
          <View className="items-center py-10">
            <Text className="text-textSecondary">No tasks found. Start your adventure!</Text>
          </View>
        ) : (
          tasks?.map(task => (
            <BentoTaskCard
              key={task.id}
              task={task}
              onPress={() => router.push(`/task/${task.id}` as any)}
            />
          ))
        )}

      </ScrollView>

      {/* Floating Add Button */}
      <AnimatedPressable
        className="absolute bottom-8 right-8 bg-primary w-16 h-16 rounded-full justify-center items-center border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
        onPress={() => router.push('/task/create' as any)}
      >
        <Ionicons name="add" size={32} color="white" />
      </AnimatedPressable>
    </View>
  );
}
