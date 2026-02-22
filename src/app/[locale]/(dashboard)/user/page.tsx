import { Metadata } from 'next'
import { UserPageContent } from '@/components/user/user-page-content'

export const metadata: Metadata = {
  title: 'Profile | Nortus',
  description: 'Manage your user profile and account settings.',
}

export default function UserPage() {
  return <UserPageContent />
}
