import { Metadata } from 'next'
import LoginForm from '@/components/auth/login-form'

export const metadata: Metadata = {
  title: 'Login | Project Fênix',
  description: 'Login to your account',
}

export default function LoginPage() {
  return (
    <div className="flex flex-col space-y-6 h-full relative">
      <p className="text-4xl font-bold text-loomi-primary mt-8 xl:mt-0">
        Nortus
      </p>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
