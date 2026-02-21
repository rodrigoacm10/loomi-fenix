import { ConversationAnalysis } from "@/types/chat";
import { Sparkles, Activity, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface ChatAnalysisPanelProps {
    analysis: ConversationAnalysis;
}

export function ChatAnalysisPanel({ analysis }: ChatAnalysisPanelProps) {
    const t = useTranslations("ChatAnalysis");

    if (!analysis) return null;

    return (
        <div className="w-80 shrink-0 bg-[#171d30] border-l border-white/5 flex flex-col h-full overflow-y-auto hidden lg:flex rounded-tr-[24px] rounded-br-[24px]">
            <div className="p-6 border-b border-white/5 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-loomi-primary" />
                <h3 className="font-semibold text-white">{t("aiAnalysis")}</h3>
            </div>

            <div className="p-6 space-y-8">
                {analysis.insights && (
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium text-loomi-muted uppercase tracking-wider">
                            {analysis.insights.title || "Insights"}
                        </h4>
                        <div className="space-y-3">
                            {analysis.insights.insights.map((insight) => (
                                <div key={insight.id} className="bg-[#242b3d] p-3 rounded-xl border border-white/5">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Activity className="w-4 h-4 text-[#4dd4ce]" />
                                        <span className="text-xs text-[#4dd4ce] font-medium">{insight.type}</span>
                                    </div>
                                    <p className="text-sm text-white">{insight.category}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {analysis.futureSteps && (
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium text-loomi-muted uppercase tracking-wider">
                            {analysis.futureSteps.title || "Próximos Passos"}
                        </h4>
                        <div className="space-y-3">
                            {analysis.futureSteps.actions.map((step) => (
                                <div key={step.id} className="flex items-start gap-3 bg-[#242b3d] p-3 rounded-xl border border-white/5">
                                    <CheckCircle2 className={`w-5 h-5 mt-0.5 shrink-0 ${step.priority === 'high' ? 'text-loomi-danger' : step.priority === 'medium' ? 'text-orange-400' : 'text-loomi-secondary'}`} />
                                    <div className="flex-1">
                                        <p className="text-sm text-white">{step.action}</p>
                                        <p className="text-[10px] text-loomi-muted mt-1 uppercase tracking-wider">{t("priority")} {step.priority}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
