import { useState, useEffect } from "react";
import { Bot, X } from "lucide-react";
import { useTranslations } from "next-intl";

interface AiSuggestionButtonProps {
    suggestion: string;
    onSend: (message: { author: string; content: string }) => void;
}

export function AiSuggestionButton({ suggestion, onSend }: AiSuggestionButtonProps) {
    const [isVisible, setIsVisible] = useState(true);
    const t = useTranslations("AiSuggestion");

    useEffect(() => {
        if (suggestion) {
            setIsVisible(true);
        }
    }, [suggestion]);

    if (!isVisible) return null;

    const handleSend = () => {
        onSend({ author: "Assistente", content: suggestion });
        setIsVisible(false);
    };

    return (
        <div className="max-w-2xl w-full mx-auto mb-3 flex justify-center relative group">
            <button
                onClick={handleSend}
                className="flex items-center gap-2 bg-[#2a324a] hover:bg-[#343e5c] transition-colors border border-loomi-primary/30 text-white rounded-2xl p-3 text-sm text-left max-w-[80%] cursor-pointer relative pr-10"
            >
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Bot className="w-5 h-5 text-loomi-primary" />

                        <p className="text-[10px] uppercase font-bold text-loomi-primary">
                            {t("hint")}
                        </p>
                    </div>

                    <p className="opacity-90 leading-relaxed">{suggestion}</p>
                </div>

                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsVisible(false);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 opacity-0 group-hover:opacity-100 hover:bg-white/10 rounded-full transition-all"
                >
                    <X className="w-4 h-4 text-white/50 hover:text-white" />
                </div>
            </button>
        </div>
    );
}
