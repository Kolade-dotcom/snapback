import ProfileScreen from '@/app/(tabs)/profile';
import { render, screen } from '@testing-library/react-native';

// Mock dependencies
jest.mock('expo-router', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

jest.mock('@/stores/authStore', () => ({
    useAuthStore: () => ({
        user: { email: 'test@example.com', user_metadata: { username: 'TestUser' } },
        signOut: jest.fn(),
    }),
}));

jest.mock('react-native-safe-area-context', () => ({
    useSafeAreaInsets: () => ({ top: 20, bottom: 0, left: 0, right: 0 }),
}));

jest.mock('@expo/vector-icons', () => ({
    Ionicons: 'Ionicons',
}));

jest.mock('@/components/ui/Button', () => ({
    Button: ({ children, onPress }: any) => (
        // @ts-ignore
        <mock-button onPress={onPress}>{children}</mock-button>
    ),
}));

jest.mock('@/stores/gameStore', () => ({
    useGameStore: () => ({
        shameScore: 75,
        redemptionCount: 5,
        title: "Filth Wizard",
        level: 3,
    }),
}));

describe('ProfileScreen', () => {
    it('renders user details correctly', () => {
        render(<ProfileScreen />);
        expect(screen.getByText('TestUser')).toBeTruthy();
        expect(screen.getByText('Filth Wizard')).toBeTruthy();
    });

    it('displays stats', () => {
        render(<ProfileScreen />);
        expect(screen.getByText('75%')).toBeTruthy(); // Shame Score
        expect(screen.getByText('5')).toBeTruthy(); // Redemptions
    });
});
