import { cn } from "@/lib/utils";
import { ChatMessage } from "@/types/chat";
import { CheckCheck } from "lucide-react";
import { Button } from "../ui/button";

interface ChatBubbleProps {
    message: ChatMessage;
}

export function ChatBubble({ message }: ChatBubbleProps) {
    const isAssistant = message.type === 'assistant_message';
    const isSuggestion = message.type === 'ai_suggestion';


    return (
        <div className={cn(
            "flex flex-col w-full mb-10",
            isAssistant || isSuggestion ? "items-end" : "items-start"
        )}>
            <div className={cn(
                "relative max-w-[50%] rounded-2xl p-4 text-sm",
                isAssistant || isSuggestion
                    ? "bg-[#3f4859] text-white rounded-br-none border-2 border-muted-foreground"
                    : "bg-loomi-secondary text-white rounded-bl-none"
            )}>
                <div className="mb-1 text-xisSuggestions opacity-70 font-semibold">
                    {message.author}
                </div>

                <p className="leading-relaxed whitespace-pre-wrap">
                    {message.content}
                </p>

                <div className="mt-2 flex items-center justify-end gap-1 text-[10px] opacity-60">
                    <span>{message.timestamp}</span>
                    {!isAssistant && !isSuggestion && <CheckCheck className="h-3 w-3" />}
                </div>
            </div>

            {isSuggestion && <div className="mt-3 w-full max-w-[50%] justify-end pl-12">
                <div className="w-full flex gap-2 justify-end">
                    <Button className="flex-1 text-sm bg-loomi-secondary hover:bg-loomi-secondary-hover rounded-full bg-loomi-primary shadow-[0px_0px_20px_0px_rgba(24,118,210,0.5)]">
                        Enviar proposta
                    </Button>
                    <Button className="flex-1 text-sm rounded-full bg-loomi-secondary hover:bg-loomi-secondary-hover bg-loomi-primary shadow-[0px_0px_20px_0px_rgba(24,118,210,0.5)]">
                        Fazer ligação
                    </Button>
                    <Button className="flex-1 text-sm rounded-full bg-loomi-secondary hover:bg-loomi-secondary-hover bg-loomi-primary shadow-[0px_0px_20px_0px_rgba(24,118,210,0.5)]">
                        Ver histórico
                    </Button>
                </div>


            </div>}
        </div>
    );
}
