import { supabase } from '@/lib/supabase';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import LoginScreen from '../login';

// Mock Supabase
jest.mock('@/lib/supabase', () => ({
    supabase: {
        auth: {
            signInWithPassword: jest.fn(),
        },
    },
}));

// Mock router
const mockPush = jest.fn();
const mockReplace = jest.fn();
jest.mock('expo-router', () => ({
    useRouter: () => ({ push: mockPush, replace: mockReplace }),
    Link: ({ children, href }: any) => { // Simple mock for Link
        const React = require('react');
        const { Text } = require('react-native');
        return <Text onPress={() => mockPush(href)}>{children}</Text>;
    }
}));

describe('LoginScreen', () => {
    it('renders correctly', () => {
        render(<LoginScreen />);
        expect(screen.getByText('Welcome Back')).toBeTruthy();
        expect(screen.getByPlaceholderText('Email')).toBeTruthy();
        expect(screen.getByPlaceholderText('Password')).toBeTruthy();
    });

    it('calls sign in on button press', async () => {
        (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
            data: { session: { user: { id: '1' } } },
            error: null,
        });

        render(<LoginScreen />);

        fireEvent.changeText(screen.getByPlaceholderText('Email'), 'test@example.com');
        fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password');
        fireEvent.press(screen.getByText('Sign In'));

        await waitFor(() => {
            expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
                email: 'test@example.com',
                password: 'password',
            });
        });
    });
});
