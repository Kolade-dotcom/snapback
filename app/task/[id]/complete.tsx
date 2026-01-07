import SuccessScreen from '@/components/tasks/SuccessScreen';
import { TaskCamera } from '@/components/tasks/TaskCamera';
import { verifyTaskCompletion } from '@/lib/ai';
import { supabase } from '@/lib/supabase';
import { useTaskStore } from '@/stores/taskStore';
import { useQueryClient } from '@tanstack/react-query';
import * as FileSystem from 'expo-file-system';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';

export default function CompleteTaskScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { proofImage, setProofImage, verificationResult, setVerificationResult, reset } = useTaskStore();
    const [verifying, setVerifying] = useState(false);
    const queryClient = useQueryClient();

    // Clean up on unmount or start
    useEffect(() => {
        return () => {
            // Optional: reset() if we want fresh state every time
            // reset(); 
        };
    }, []);

    const handlePhotoCaptured = async (uri: string) => {
        setProofImage(uri);
        setVerifying(true);

        try {
            // Get Task Title for context
            const { data: task, error: fetchError } = await supabase
                .from('tasks')
                .select('title')
                .eq('id', id)
                .single();

            if (fetchError || !task) throw new Error("Could not fetch task details");

            // Read image
            const base64 = await FileSystem.readAsStringAsync(uri, {
                encoding: 'base64',
            });

            // Verify
            const result = await verifyTaskCompletion(base64, task.title);

            if (result.completed) {
                setVerificationResult(result);
                // Update DB
                await supabase.from('tasks').update({ status: 'completed' }).eq('id', id);
                queryClient.invalidateQueries({ queryKey: ['tasks'] });
                queryClient.invalidateQueries({ queryKey: ['task', id] });
            } else {
                Alert.alert("Verification Failed", result.roast || "Doesn't look done to me.", [
                    {
                        text: "Try Again", onPress: () => {
                            setProofImage(null);
                            setVerifying(false);
                        }
                    }
                ]);
            }

        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Could not verify task.");
            setProofImage(null);
            setVerifying(false);
        } finally {
            if (!verificationResult) {
                // If success, we keep verifying state true to show success screen? 
                // actually setVerifying(false) usually triggers UI update. 
                // But wait, if success, we render SuccessScreen.
            }
        }
    };

    if (verificationResult?.completed) {
        return <SuccessScreen roast={verificationResult.roast} />;
    }

    if (verifying) {
        return (
            <View className="flex-1 bg-background justify-center items-center">
                <Text className="text-2xl font-black mb-4">JUDGING YOU...</Text>
                <Text>Please wait while we verify your redemption.</Text>
            </View>
        );
    }

    return (
        <TaskCamera
            onPhotoCaptured={handlePhotoCaptured}
            onClose={() => router.back()}
        />
    );
}
