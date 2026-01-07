import { fireEvent, render, screen } from '@testing-library/react-native';
import { Input } from '../Input';

describe('Input', () => {
    it('renders correctly', () => {
        render(<Input placeholder="Enter text" />);
        expect(screen.getByPlaceholderText('Enter text')).toBeTruthy();
    });

    it('handles text change', () => {
        const onChangeText = jest.fn();
        render(<Input onChangeText={onChangeText} testID="input" />);
        fireEvent.changeText(screen.getByTestId('input'), 'hello');
        expect(onChangeText).toHaveBeenCalledWith('hello');
    });
});
