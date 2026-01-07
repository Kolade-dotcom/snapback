import { Session } from '@supabase/supabase-js';
import { act, renderHook } from '@testing-library/react-native';
import { useAuthStore } from '../authStore';

// Mock Supabase session
const mockSession: Session = {
    access_token: 'mock-token',
    token_type: 'bearer',
    expires_in: 3600,
    refresh_token: 'mock-refresh',
    user: {
        id: 'user-123',
        aud: 'authenticated',
        role: 'authenticated',
        email: 'test@example.com',
        app_metadata: {},
        user_metadata: {},
        created_at: '2023-01-01T00:00:00Z',
    },
    expires_at: 1234567890,
};

describe('authStore', () => {
    it('should have initial state null', () => {
        const { result } = renderHook(() => useAuthStore());
        expect(result.current.session).toBeNull();
        expect(result.current.user).toBeNull();
        expect(result.current.initialized).toBeFalsy();
    });

    it('should set session and user', () => {
        const { result } = renderHook(() => useAuthStore());

        act(() => {
            result.current.setSession(mockSession);
        });

        expect(result.current.session).toEqual(mockSession);
        expect(result.current.user).toEqual(mockSession.user);
        expect(result.current.initialized).toBeTruthy();
    });

    it('should clear session on sign out', () => {
        const { result } = renderHook(() => useAuthStore());

        act(() => {
            result.current.setSession(mockSession);
        });

        act(() => {
            result.current.signOut();
        });

        expect(result.current.session).toBeNull();
        expect(result.current.user).toBeNull();
    });
});
