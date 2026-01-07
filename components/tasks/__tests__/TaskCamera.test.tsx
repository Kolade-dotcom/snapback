import { fireEvent, render, screen } from '@testing-library/react-native';
import { TaskCamera } from '../TaskCamera';

// Mock expo-camera
jest.mock('expo-camera', () => ({
    CameraView: jest.fn(({ children }) => <>{children}</>),
    useCameraPermissions: jest.fn(),
}));

describe('TaskCamera', () => {
    const mockUnmount = jest.fn();
    const mockOnPhotoCaptured = jest.fn();
    const mockRequestPermission = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders permission request button when permission is not granted', () => {
        (require('expo-camera').useCameraPermissions as jest.Mock).mockReturnValue([
            { granted: false },
            mockRequestPermission,
        ]);

        render(<TaskCamera onPhotoCaptured={mockOnPhotoCaptured} onClose={mockUnmount} />);

        expect(screen.getByText('Grant Permission')).toBeTruthy();

        fireEvent.press(screen.getByText('Grant Permission'));
        expect(mockRequestPermission).toHaveBeenCalled();
    });

    it('renders camera view when permission is granted', () => {
        (require('expo-camera').useCameraPermissions as jest.Mock).mockReturnValue([
            { granted: true },
            mockRequestPermission,
        ]);

        render(<TaskCamera onPhotoCaptured={mockOnPhotoCaptured} onClose={mockUnmount} />);

        // Check for camera-related UI elements (e.g., shutter button)
        expect(screen.getByTestId('shutter-button')).toBeTruthy();
    });
});
