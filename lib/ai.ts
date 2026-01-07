import { OpenAI } from 'openai';

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true, // Required for React Native
});

export async function analyzeTaskImage(base64Image: string) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo", // or gpt-4-vision-preview
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Analyze this image for a to-do list app called 'Snapback'. The app roasts users for not doing tasks. 1. Identify the task (e.g. 'Clean this messy desk'). 2. Give a difficulty score 1-100 (100 = impossible mess). 3. Write a short, mean roast about the state of this object/room. Return ONLY JSON: { \"title\": string, \"difficultyScore\": number, \"roast\": string }." },
                        {
                            type: "image_url",
                            image_url: {
                                "url": `data:image/jpeg;base64,${base64Image}`,
                            },
                        },
                    ],
                },
            ],
            max_tokens: 300,
        });

        const content = response.choices[0].message.content;
        // Extract JSON from markdown code blocks if present
        const jsonMatch = content?.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        return JSON.parse(content || '{}');
    } catch (error) {
        console.error("AI Analysis Failed:", error);
        throw error;
    }
}

export async function verifyTaskCompletion(base64Image: string, taskTitle: string) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: `The user claims they have completed the task: "${taskTitle}". Analyze this image. 1. Does it look done/clean/fixed compared to a typical mess? 2. Return JSON: { "completed": boolean, "roast": string (praise if true, roast if false) }.` },
                        {
                            type: "image_url",
                            image_url: {
                                "url": `data:image/jpeg;base64,${base64Image}`,
                            },
                        },
                    ],
                },
            ],
            max_tokens: 300,
        });

        const content = response.choices[0].message.content;
        const jsonMatch = content?.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        return JSON.parse(content || '{}');
    } catch (error) {
        console.error("AI Verification Failed:", error);
        throw error;
    }
}
