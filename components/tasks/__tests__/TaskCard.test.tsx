import { render, screen } from '@testing-library/react-native';
import { TaskCard } from '../TaskCard';

// Mock task data matching our schema roughly
const mockTask = {
    id: '1',
    userId: 'user-1',
    title: 'Wash Dishes',
    status: 'pending',
    difficultyScore: 50,
    shameCreditsEarned: 0,
    createdAt: new Date('2023-01-01'),
} as any;

describe('TaskCard', () => {
    it('renders task title', () => {
        render(<TaskCard task={mockTask} />);
        expect(screen.getByText('Wash Dishes')).toBeTruthy();
    });

    it('renders difficulty score', () => {
        render(<TaskCard task={mockTask} />);
        // Assuming we show "50 Credits" or similar
        expect(screen.getByText(/50/)).toBeTruthy();
    });
});
