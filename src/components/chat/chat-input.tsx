"use client";

import { SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useChatStore } from "@/store/chat-store";

interface ChatInputProps {
    onSend: (message: { author: string, content: string }) => void;
}

export function ChatInput({ onSend }: ChatInputProps) {
    const { author } = useChatStore();
    const [message, setMessage] = useState("");
    const handleSend = () => {
        if (!message.trim()) return;
        onSend({ author: author || "", content: message });
        setMessage("");
        console.log('[ChatInput] message sent:', message);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="relative flex items-center max-w-4xl mx-auto">
            <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escreva aqui..."
                className="bg-[#20273e] border border-[#ffffff]/30 text-white rounded-full py-8 px-6 placeholder:text-[#ffffff]"
            />
            <Button
                size="icon"
                onClick={handleSend}
                className="absolute right-4 h-9 w-9 rounded-full bg-[#0066cc] hover:bg-[#0055aa]"
            >
                <SendHorizontal className="h-4 w-4 text-white" />
            </Button>
        </div>
    );
}
