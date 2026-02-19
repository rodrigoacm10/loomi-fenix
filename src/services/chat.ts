import api from '@/lib/api';
import { ChatResponse, ChatMessage } from '@/types/chat';

export const chatService = {
    getChatData: async (): Promise<ChatResponse> => {
        const response = await api.get<ChatResponse>('/nortus-v1/chat');
        return response.data;
    },

    sendMessage: async (author: string, content: string): Promise<ChatMessage> => {
        await new Promise(resolve => setTimeout(resolve, 500));

        return {
            id: `msg_${Date.now()}`,
            author,
            content,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'assistant_message'
        };
    }
};
