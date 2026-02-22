"use client";

import { useEffect } from "react";
import { useChatStore } from "@/store/chat-store";
import { ChatBubble } from "@/components/chat/chat-bubble";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatAnalysisPanel } from "@/components/chat/chat-analysis-panel";
import { Skeleton } from "@/components/ui/skeleton";
import Container from "@/components/global/container";
import { useTranslations } from "next-intl";
import { AiSuggestionButton } from "@/components/chat/ai-suggestion-button";

export default function ChatPage() {
    const { messages, loading, fetchChatData, sendMessage, conversationAnalysis, iaSuggestion } = useChatStore();
    const t = useTranslations("Chat");

    useEffect(() => {
        fetchChatData();
    }, [fetchChatData]);


    return (
        <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex flex-col lg:flex-1 h-[calc(100vh-155px)] min-w-0 min-h-0 rounded-[24px]">
                <Container className="flex flex-col flex-1 min-h-0 bg-loomi-bg-card/50 border-0 rounded-[24px]">
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
                                <div className="flex flex-col space-y-4 w-full">
                                    <div className="flex justify-start">
                                        <Skeleton className="h-[70px] w-[60%] sm:w-[45%] md:w-[35%] rounded-t-[20px] rounded-br-[20px] rounded-bl-[4px]" />
                                    </div>
                                    <div className="flex justify-end">
                                        <Skeleton className="h-[50px] w-[50%] sm:w-[35%] md:w-[25%] rounded-t-[20px] rounded-bl-[20px] rounded-br-[4px] bg-loomi-primary/20" />
                                    </div>
                                    <div className="flex justify-start">
                                        <Skeleton className="h-[90px] w-[70%] sm:w-[50%] md:w-[40%] rounded-t-[20px] rounded-br-[20px] rounded-bl-[4px]" />
                                    </div>
                                    <div className="flex justify-end">
                                        <Skeleton className="h-[60px] w-[45%] sm:w-[30%] md:w-[20%] rounded-t-[20px] rounded-bl-[20px] rounded-br-[4px] bg-loomi-primary/20" />
                                    </div>
                                </div>
                            ) : (
                                messages.map((msg) => <ChatBubble key={msg.id} message={msg} />)
                            )}
                            <div />
                        </div>
                    </div>
                </Container>

                <div className="mt-4 flex flex-col">
                    {iaSuggestion && !loading && (
                        <AiSuggestionButton suggestion={iaSuggestion} onSend={sendMessage} />
                    )}
                    <div className="w-full">
                        <ChatInput onSend={sendMessage} />
                    </div>
                </div>
            </div>

            {conversationAnalysis && !loading && (
                <ChatAnalysisPanel analysis={conversationAnalysis} />
            )}
        </div>
    );
}
