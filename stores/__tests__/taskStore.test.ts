import { act, renderHook } from '@testing-library/react-native';
import { useTaskStore } from '../taskStore';

describe('taskStore', () => {
    it('should have initial state', () => {
        const { result } = renderHook(() => useTaskStore());
        expect(result.current.draftImage).toBeNull();
        expect(result.current.isAnalyzing).toBeFalsy();
        expect(result.current.analysisResult).toBeNull();
    });

    it('should set draft image', () => {
        const { result } = renderHook(() => useTaskStore());
        act(() => {
            result.current.setDraftImage('file://test.jpg');
        });
        expect(result.current.draftImage).toBe('file://test.jpg');
    });

    it('should set analyzing state', () => {
        const { result } = renderHook(() => useTaskStore());
        act(() => {
            result.current.setIsAnalyzing(true);
        });
        expect(result.current.isAnalyzing).toBeTruthy();
    });

    it('should set analysis result', () => {
        const { result } = renderHook(() => useTaskStore());
        act(() => {
            result.current.setAnalysisResult('Clean the room');
        });
        expect(result.current.analysisResult).toBe('Clean the room');
    });

    it('should clear draft', () => {
        const { result } = renderHook(() => useTaskStore());
        act(() => {
            result.current.setDraftImage('file://test.jpg');
            result.current.setIsAnalyzing(true);
            result.current.setAnalysisResult('Clean');
        });

        act(() => {
            result.current.clearDraft();
        });

        expect(result.current.draftImage).toBeNull();
        expect(result.current.isAnalyzing).toBeFalsy();
        expect(result.current.analysisResult).toBeNull();
    });
});
