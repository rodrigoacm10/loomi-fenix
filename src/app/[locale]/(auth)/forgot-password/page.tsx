import { Metadata } from 'next'
import ForgotPasswordForm from '@/components/auth/forgot-password-form'

export const metadata: Metadata = {
  title: 'Forgot Password | Project Fênix',
  description: 'Reset your password',
}

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col space-y-6 h-full relative">
      <p className="text-4xl font-bold text-loomi-primary mt-8 xl:mt-0">
        Nortus
      </p>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  )
}
