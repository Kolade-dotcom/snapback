import { create } from 'zustand';

interface TaskState {
    draftImage: string | null;
    proofImage: string | null;
    isAnalyzing: boolean;
    isVerifying: boolean;
    analysisResult: { title: string; difficultyScore: number; roast: string } | null;
    verificationResult: { completed: boolean; roast: string } | null;
    setDraftImage: (uri: string | null) => void;
    setProofImage: (uri: string | null) => void;
    setIsAnalyzing: (isAnalyzing: boolean) => void;
    setIsVerifying: (isVerifying: boolean) => void;
    setAnalysisResult: (result: any) => void;
    setVerificationResult: (result: any) => void;
    reset: () => void;
}

export const useTaskStore = create<TaskState>((set) => ({
    draftImage: null,
    proofImage: null,
    isAnalyzing: false,
    isVerifying: false,
    analysisResult: null,
    verificationResult: null,
    setDraftImage: (uri) => set({ draftImage: uri }),
    setProofImage: (uri) => set({ proofImage: uri }),
    setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
    setIsVerifying: (isVerifying) => set({ isVerifying }),
    setAnalysisResult: (result) => set({ analysisResult: result }),
    setVerificationResult: (result) => set({ verificationResult: result }),
    reset: () => set({
        draftImage: null,
        proofImage: null,
        analysisResult: null,
        verificationResult: null,
        isAnalyzing: false,
        isVerifying: false
    }),
}));
