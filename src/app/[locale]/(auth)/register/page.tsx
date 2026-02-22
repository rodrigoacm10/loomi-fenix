import { Metadata } from 'next'
import RegisterForm from '@/components/auth/register-form'

export const metadata: Metadata = {
  title: 'Register | Nortus',
  description: 'Create your account',
}

export default function RegisterPage() {
  return (
    <div className="flex flex-col space-y-6 h-full">
      <p className="text-4xl font-bold text-loomi-primary mt-8 xl:mt-0">
        Nortus
      </p>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full">
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}
