import { render, screen } from '@testing-library/react-native';
import { TaskList } from '../TaskList';

const mockTasks = [
    { id: '1', title: 'Task 1', difficultyScore: 10, beforePhotoUrl: null },
    { id: '2', title: 'Task 2', difficultyScore: 20, beforePhotoUrl: null },
];

describe('TaskList', () => {
    it('renders list of tasks', () => {
        render(<TaskList tasks={mockTasks} />);
        expect(screen.getByText('Task 1')).toBeTruthy();
        expect(screen.getByText('Task 2')).toBeTruthy();
    });

    it('renders empty state', () => {
        render(<TaskList tasks={[]} />);
        expect(screen.getByText('No tasks yet!')).toBeTruthy();
    });
});
