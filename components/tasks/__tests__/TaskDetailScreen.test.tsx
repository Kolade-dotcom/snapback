import { render, screen } from '@testing-library/react-native';
import TaskDetailScreen from '../../../app/task/[id]';

// Mock dependencies
jest.mock('expo-router', () => ({
    useLocalSearchParams: () => ({ id: '123' }),
    useRouter: () => ({
        push: jest.fn(),
        back: jest.fn(),
    }),
}));

// Mock Supabase/Query
jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
}));

// Mock Supabase Client separately if needed, but we mainly mock the hook
jest.mock('@/lib/supabase', () => ({
    supabase: {
        from: jest.fn(),
    },
}));

describe('TaskDetailScreen', () => {
    it('renders task details correctly', () => {
        const mockTask = {
            id: '123',
            title: 'Messy Desk',
            difficulty_score: 85,
            roast: 'Your desk looks like a hurricane hit a stationary store.',
            status: 'pending',
        };

        (require('@tanstack/react-query').useQuery as jest.Mock).mockReturnValue({
            data: mockTask,
            isLoading: false,
        });

        render(<TaskDetailScreen />);

        expect(screen.getByText('Messy Desk')).toBeTruthy();
        expect(screen.getByText(/Your desk looks like/)).toBeTruthy();
        expect(screen.getByText('85% SHAME')).toBeTruthy(); // Checking for RoastCard content logic
    });

    it('shows loading state', () => {
        (require('@tanstack/react-query').useQuery as jest.Mock).mockReturnValue({
            data: null,
            isLoading: true,
        });

        render(<TaskDetailScreen />);
        expect(screen.getByTestId('loading-indicator')).toBeTruthy();
        // OR check for loading text if prefered, ensuring ActivityIndicator has testID or is findable
    });
});
