import OpenAI from 'openai';

const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY || '';

export const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true, // Required for React Native
});
