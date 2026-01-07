import { fireEvent, render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Button } from '../Button';

describe('Button', () => {
    it('renders correctly', () => {
        render(<Button onPress={() => { }}><Text>Press Me</Text></Button>);
        expect(screen.getByText('Press Me')).toBeTruthy();
    });

    it('handles press properly', () => {
        const onPressMock = jest.fn();
        render(<Button onPress={onPressMock}><Text>Press Me</Text></Button>);

        fireEvent.press(screen.getByText('Press Me'));
        expect(onPressMock).toHaveBeenCalled();
    });
});
