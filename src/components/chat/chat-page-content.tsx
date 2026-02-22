'use client'

import { useEffect } from 'react'
import { useChatStore } from '@/store/chat-store'
import { ChatBubble } from '@/components/chat/chat-bubble'
import { ChatInput } from '@/components/chat/chat-input'
import { ChatAnalysisPanel } from '@/components/chat/chat-analysis-panel'
import { SkeletonChat } from '@/components/chat/skeleton-chat'
import Container from '@/components/global/container'
import { useTranslations } from 'next-intl'
import { AiSuggestionButton } from '@/components/chat/ai-suggestion-button'

export function ChatPageContent() {
  const {
    messages,
    loading,
    fetchChatData,
    sendMessage,
    conversationAnalysis,
    iaSuggestion,
  } = useChatStore()
  const t = useTranslations('Chat')

  useEffect(() => {
    fetchChatData()
  }, [fetchChatData])

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex flex-col lg:flex-1 h-[calc(100vh-155px)] min-w-0 min-h-0 rounded-[24px]">
        <Container className="flex flex-col flex-1 min-h-0 bg-loomi-bg-card/50 border-0 rounded-[24px]">
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 custom-scrollbar">
            <div className="flex flex-col justify-end min-h-full">
              <div className="flex justify-center mb-8 mt-4">
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                  {t('today')} 16:40
                </span>
              </div>

              {loading ? (
                <SkeletonChat />
              ) : (
                messages.map((msg) => <ChatBubble key={msg.id} message={msg} />)
              )}
              <div />
            </div>
          </div>
        </Container>

        <div className="mt-4 flex flex-col">
          {iaSuggestion && !loading && (
            <AiSuggestionButton
              suggestion={iaSuggestion}
              onSend={sendMessage}
            />
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
  )
}
