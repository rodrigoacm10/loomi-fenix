import { cn } from '@/lib/utils'
import { ChatMessage } from '@/types/chat'
import { Bot, CheckCheck } from 'lucide-react'
import { Button } from '../ui/button'
import { useTranslations } from 'next-intl'

interface ChatBubbleProps {
  message: ChatMessage
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isAssistant = message.type === 'assistant_message'
  const isSuggestion = message.type === 'ai_suggestion'
  const t = useTranslations('AiSuggestion')

  return (
    <div
      className={cn(
        'flex flex-col w-full mb-10',
        isAssistant || isSuggestion ? 'items-end' : 'items-start',
      )}
    >
      <div
        className={cn(
          'relative max-w-[50%] rounded-2xl p-4 text-sm',
          isAssistant || isSuggestion
            ? 'bg-[#3f4859] text-white rounded-br-none border-2 border-muted-foreground'
            : 'bg-loomi-secondary text-white rounded-bl-none',
        )}
      >
        <div className="flex items-center gap-2 mb-1 text-xisSuggestions opacity-70 font-semibold">
          {isSuggestion && <Bot className="w-5 h-5" />}

          <p>{message.author}</p>
        </div>

        <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>

        <div className="mt-2 flex items-center justify-end gap-1 text-[10px] opacity-60">
          <span>{message.timestamp}</span>
          {!isAssistant && !isSuggestion && <CheckCheck className="h-3 w-3" />}
        </div>
      </div>

      {isSuggestion && (
        <div className="mt-3 w-full max-w-[50%] justify-end pl-12">
          <div className="w-full flex gap-2 justify-end">
            <Button className="flex-1 text-sm  hover:bg-loomi-primary-hover rounded-full bg-loomi-primary shadow-[0px_0px_20px_0px_rgba(24,118,210,0.5)]">
              {t('sendProposal')}
            </Button>
            <Button className="flex-1 text-sm rounded-full  hover:bg-loomi-primary-hover bg-loomi-primary shadow-[0px_0px_20px_0px_rgba(24,118,210,0.5)]">
              {t('makeCall')}
            </Button>
            <Button className="flex-1 text-sm rounded-full  hover:bg-loomi-primary-hover bg-loomi-primary shadow-[0px_0px_20px_0px_rgba(24,118,210,0.5)]">
              {t('viewHistory')}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
