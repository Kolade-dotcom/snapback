import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Card } from '../Card';

describe('Card', () => {
    it('renders children correctly', () => {
        render(<Card><Text>Hello Card</Text></Card>);
        expect(screen.getByText('Hello Card')).toBeTruthy();
    });
});
