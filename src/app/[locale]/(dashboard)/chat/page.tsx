import { Metadata } from 'next'
import { ChatPageContent } from '@/components/chat/page/chat-page-content'

export const metadata: Metadata = {
  title: 'Chat | Nortus',
  description: 'AI-assisted chat for customer support operators.',
}

export default function ChatPage() {
  return <ChatPageContent />
}
