import { act, renderHook } from '@testing-library/react-native';
import { useCreditStore } from '../creditStore';

describe('creditStore', () => {
    it('should have initial state', () => {
        const { result } = renderHook(() => useCreditStore());
        expect(result.current.totalCredits).toBe(0);
        expect(result.current.currentStreak).toBe(0);
    });

    it('should set credits', () => {
        const { result } = renderHook(() => useCreditStore());
        act(() => {
            result.current.setCredits(100);
        });
        expect(result.current.totalCredits).toBe(100);
    });

    it('should increment credits', () => {
        const { result } = renderHook(() => useCreditStore());
        act(() => {
            result.current.setCredits(100);
        });
        act(() => {
            result.current.incrementCredits(50);
        });
        expect(result.current.totalCredits).toBe(150);
    });

    it('should set streak', () => {
        const { result } = renderHook(() => useCreditStore());
        act(() => {
            result.current.setStreak(5);
        });
        expect(result.current.currentStreak).toBe(5);
    });
});
