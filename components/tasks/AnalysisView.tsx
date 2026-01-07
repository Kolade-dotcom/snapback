import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { analyzeTaskImage } from '@/lib/ai';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';
import { useGameStore } from '@/stores/gameStore';
import { useTaskStore } from '@/stores/taskStore';
import * as FileSystem from 'expo-file-system';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function AnalysisView() {
    const { draftImage, isAnalyzing, analysisResult, setIsAnalyzing, setAnalysisResult, reset } = useTaskStore();
    const { addShame } = useGameStore();
    const { user } = useAuthStore();
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (draftImage && !analysisResult && !isAnalyzing) {
            startAnalysis();
        }
    }, [draftImage]);

    // Update title state when analysis comes in
    useEffect(() => {
        if (analysisResult?.title) {
            setTitle(analysisResult.title);
        }
        if (analysisResult?.difficultyScore) {
            // Update Global Shame Score!
            addShame(analysisResult.difficultyScore / 10); // Example logic: 10% of difficulty adds to shame
        }
    }, [analysisResult]);

    async function startAnalysis() {
        try {
            setIsAnalyzing(true);

            // Read file as base64
            const base64 = await FileSystem.readAsStringAsync(draftImage!, {
                encoding: 'base64',
            });

            const result = await analyzeTaskImage(base64);
            setAnalysisResult(result);
        } catch (error) {
            console.error(error);
            // Fallback result for demo/error
            setAnalysisResult({
                title: "Unknown Mess",
                difficultyScore: 50,
                roast: "This is so unrecognizable even AI gave up. Fix your life.",
            });
        } finally {
            setIsAnalyzing(false);
        }
    }

    async function saveTask() {
        if (!user || !analysisResult) return;
        setSaving(true);

        try {
            // 1. Upload Image to Supabase Storage (Skipped for pure MVP speed, using local or skipping image upload logic for now. 
            // Ideally we upload to 'task-images' bucket).
            // For this step, let's assume we save the local URI or upload. 
            // To keep it simple and working: We will just save the metadata. 
            // Real app needs `supabase.storage.from('tasks').upload(...)`.

            const { error } = await supabase.from('tasks').insert({
                user_id: user.id,
                title: title,
                difficulty_score: analysisResult.difficultyScore,
                roast: analysisResult.roast,
                status: 'pending',
                // before_photo_url: ... (omit for now or implement storage)
            });

            if (error) throw error;

            reset(); // Clear store
            router.replace('/(tabs)');

        } catch (error) {
            console.error('Save failed:', error);
            alert('Failed to save task');
        } finally {
            setSaving(false);
        }
    }

    if (isAnalyzing) {
        return (
            <View className="flex-1 justify-center items-center bg-background px-8">
                <Text className="text-6xl mb-6">🤖</Text>
                <Text className="text-2xl font-bold text-center mb-2 font-inter-bold">Analyzing Your Mess...</Text>
                <Text className="text-textSecondary text-center mb-8">
                    Preparing valid insults and calculating shame levels.
                </Text>
                <ActivityIndicator size="large" color="#FF6B6B" />
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 bg-background" contentContainerStyle={{ padding: 24, paddingTop: insets.top }}>
            <Image
                source={{ uri: draftImage! }}
                className="w-full h-64 rounded-3xl mb-6 border-2 border-black"
                resizeMode="cover"
            />

            <View className="bg-white border-2 border-black rounded-3xl p-6 mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Text className="text-sm font-bold text-primary uppercase tracking-widest mb-2">
                    AI VERDICT
                </Text>
                <Text className="text-3xl font-black text-text mb-4 font-inter-black">
                    {analysisResult?.difficultyScore}% SHAME
                </Text>
                <Text className="text-lg text-text italic mb-4 font-inter-medium">
                    "{analysisResult?.roast}"
                </Text>
            </View>

            <View className="space-y-4">
                <Text className="font-bold text-lg">Task Title</Text>
                <Input
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Name this task"
                />

                <View className="flex-row gap-4 mt-4">
                    <Button
                        variant="secondary"
                        className="flex-1 bg-white border-black"
                        onPress={() => reset()}
                    >
                        <Text className="text-black font-bold">Retake</Text>
                    </Button>
                    <Button
                        className="flex-1"
                        onPress={saveTask}
                        disabled={saving}
                    >
                        {saving ? "Saving..." : "Accept Challenge"}
                    </Button>
                </View>
            </View>
        </ScrollView>
    );
}
