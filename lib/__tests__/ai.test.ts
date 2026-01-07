import { verifyTaskCompletion } from '../ai';

// Mock OpenAI
const mockCreate = jest.fn();
jest.mock('openai', () => ({
    OpenAI: jest.fn().mockImplementation(() => ({
        chat: {
            completions: {
                create: mockCreate,
            },
        },
    })),
}));

describe('verifyTaskCompletion', () => {
    beforeEach(() => {
        mockCreate.mockClear();
    });

    it('returns parsed result on success', async () => {
        const mockResponse = {
            choices: [{
                message: {
                    content: JSON.stringify({
                        completed: true,
                        roast: "Wow, you actually did it. I'm impressed."
                    })
                }
            }]
        };
        mockCreate.mockResolvedValue(mockResponse);

        const result = await verifyTaskCompletion('base64image', 'Clean Desk');

        expect(result).toEqual({
            completed: true,
            roast: "Wow, you actually did it. I'm impressed."
        });
        expect(mockCreate).toHaveBeenCalledWith(expect.objectContaining({
            max_tokens: 300
        }));
    });

    it('handles negative verification', async () => {
        const mockResponse = {
            choices: [{
                message: {
                    content: JSON.stringify({
                        completed: false,
                        roast: "You call that clean? Try again."
                    })
                }
            }]
        };
        mockCreate.mockResolvedValue(mockResponse);

        const result = await verifyTaskCompletion('base64image', 'Clean Desk');
        expect(result.completed).toBe(false);
    });
});
