import { useTaskStore } from '@/stores/taskStore';
import { render, screen } from '@testing-library/react-native';
import CreateTaskScreen from '../../../app/task/create';

// Mock dependencies
jest.mock('expo-router', () => ({
    useRouter: () => ({
        push: jest.fn(),
        back: jest.fn(),
        replace: jest.fn(),
    }),
}));

// Mock TaskCamera component since we tested it separately
jest.mock('@/components/tasks/TaskCamera', () => ({
    TaskCamera: ({ onPhotoCaptured }: { onPhotoCaptured: (uri: string) => void }) => (
        <mock-TaskCamera testID="task-camera" onPhotoCaptured={() => onPhotoCaptured('test-uri.jpg')} />
    ),
}));

// Mock OpenAI or AI store if needed (taskStore handles logic)
jest.mock('@/stores/taskStore', () => ({
    useTaskStore: jest.fn(),
}));

describe('CreateTaskScreen', () => {
    const mockSetDraftImage = jest.fn();
    const mockDraftImage = null;

    beforeEach(() => {
        (useTaskStore as unknown as jest.Mock).mockReturnValue({
            draftImage: mockDraftImage,
            setDraftImage: mockSetDraftImage,
            isAnalyzing: false,
            analysisResult: null,
            reset: jest.fn(),
        });
    });

    it('shows camera initially', () => {
        render(<CreateTaskScreen />);
        expect(screen.getByTestId('task-camera')).toBeTruthy();
    });

    it('handles photo capture', async () => {
        // Setup store to reflect image capture
        (useTaskStore as unknown as jest.Mock).mockReturnValue({
            draftImage: 'captured-uri.jpg',
            setDraftImage: mockSetDraftImage,
            isAnalyzing: false,
            analysisResult: null,
        });

        render(<CreateTaskScreen />);

        // Should show analysis view or preview, not camera
        // For now checking that camera is NOT there might be enough or checking for "Analyzing" text
        expect(screen.queryByTestId('task-camera')).toBeNull();
        // Expect some UI indicating image is there
        expect(screen.getByTestId('preview-image')).toBeTruthy();
    });
});
