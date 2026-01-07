import { Button } from '@/components/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface TaskCameraProps {
    onPhotoCaptured: (uri: string) => void;
    onClose: () => void;
}

export function TaskCamera({ onPhotoCaptured, onClose }: TaskCameraProps) {
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);
    const [facing, setFacing] = useState<'back' | 'front'>('back');
    const insets = useSafeAreaInsets();

    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View className="flex-1 justify-center items-center px-8 bg-background">
                <Text className="text-center text-lg mb-6 font-inter-medium">
                    We need your permission to see your mess.
                </Text>
                <Button onPress={requestPermission} className="w-full">
                    Grant Permission
                </Button>
            </View>
        );
    }

    async function takePicture() {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync({
                    quality: 0.7,
                    base64: true, // We need base64 for AI analysis
                    skipProcessing: true, // Faster capture
                });
                if (photo?.uri) {
                    onPhotoCaptured(photo.uri);
                }
            } catch (error) {
                Alert.alert('Failed to take photo', (error as Error).message);
            }
        }
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    return (
        <View className="flex-1 bg-black">
            <CameraView
                ref={cameraRef}
                style={StyleSheet.absoluteFill}
                facing={facing}
            >
                <View className="flex-1 justify-between" style={{ paddingTop: insets.top, paddingBottom: insets.bottom + 20 }}>
                    {/* Header Controls */}
                    <View className="flex-row justify-between px-4 pt-4">
                        <TouchableOpacity
                            onPress={onClose}
                            className="w-10 h-10 bg-black/50 rounded-full items-center justify-center border border-white/20"
                        >
                            <Ionicons name="close" size={24} color="white" />
                        </TouchableOpacity>

                        <View className="bg-black/50 px-4 py-2 rounded-full border border-white/20">
                            <Text className="text-white font-bold text-xs uppercase tracking-widest">
                                SNAP YOUR TASK
                            </Text>
                        </View>

                        <TouchableOpacity
                            onPress={toggleCameraFacing}
                            className="w-10 h-10 bg-black/50 rounded-full items-center justify-center border border-white/20"
                        >
                            <Ionicons name="camera-reverse" size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* Camera Overlay Elements (Guides) */}
                    <View className="flex-1 justify-center items-center opactiy-50 pointer-events-none">
                        <View className="w-64 h-64 border-2 border-white/30 rounded-3xl border-dashed" />
                    </View>

                    {/* Shutter Button area */}
                    <View className="flex-row justify-center items-center pb-8">
                        <TouchableOpacity
                            testID="shutter-button"
                            onPress={takePicture}
                            className="w-20 h-20 bg-white rounded-full items-center justify-center border-4 border-gray-300 shadow-lg"
                            activeOpacity={0.7}
                        >
                            <View className="w-16 h-16 bg-white rounded-full border-2 border-black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </CameraView>
        </View>
    );
}
