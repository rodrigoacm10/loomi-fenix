"use client";

import { useEffect } from "react";
import { useChatStore } from "@/store/chat-store";
import { ChatBubble } from "@/components/chat/chat-bubble";
import { ChatInput } from "@/components/chat/chat-input";
import { Loader2 } from "lucide-react";
import Container from "@/components/global/container";
import { useTranslations } from "next-intl";

export default function ChatPage() {
    const { messages, loading, fetchChatData, sendMessage } = useChatStore();
    const t = useTranslations("Chat");

    useEffect(() => {
        fetchChatData();
    }, [fetchChatData]);


    return (
        <div className="flex flex-col h-[calc(100vh-155px)]">
            <Container className="flex flex-col flex-1 min-h-0 bg-[#171d30]/50 border-0">
                <div
                    className="flex-1 overflow-y-auto px-4 py-4 space-y-4 custom-scrollbar"
                >
                    <div className="flex flex-col justify-end min-h-full">
                        <div className="flex justify-center mb-8 mt-4">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                                {t("today")} 16:40
                            </span>
                        </div>

                        {loading ? (
                            <div className="flex justify-center items-center h-full">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                        ) : (
                            messages.map((msg) => <ChatBubble key={msg.id} message={msg} />)
                        )}
                        <div />
                    </div>
                </div>
            </Container>

            <div className="mt-4">
                <ChatInput onSend={sendMessage} />
            </div>
        </div>
    );
}
