import { AnalysisView } from '@/components/tasks/AnalysisView';
import { TaskCamera } from '@/components/tasks/TaskCamera';
import { useTaskStore } from '@/stores/taskStore';
import { useRouter } from 'expo-router';

export default function CreateTaskScreen() {
    const { draftImage, setDraftImage } = useTaskStore();
    const router = useRouter();

    if (draftImage) {
        return <AnalysisView />;
    }

    return (
        <TaskCamera
            onPhotoCaptured={setDraftImage}
            onClose={() => router.back()}
        />
    );
}
