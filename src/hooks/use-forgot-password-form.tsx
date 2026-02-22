import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'

import api from '@/lib/api'
import { SuccessToast } from '@/components/global/success-toast'
import { ErrorToast } from '@/components/global/error-toast'
import {
  ForgotPasswordFormValues,
  forgotPasswordSchema,
} from '@/schemas/forgot-password-schema'

export function useForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const t = useTranslations('ForgotPasswordPage')

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  async function onSubmit(data: ForgotPasswordFormValues) {
    setIsLoading(true)
    try {
      await api.post('/auth/forgot-password', data)

      toast.custom((toastProps) => (
        <SuccessToast
          t={toastProps}
          title={t('successMessage')}
          description={t('successDescription')}
        />
      ))
      form.reset()
    } catch (error) {
      console.error(error)
      const err = error as { response?: { data?: { message?: string } } }
      toast.custom((toastProps) => (
        <ErrorToast
          t={toastProps}
          title={err.response?.data?.message || t('failMessage')}
          description=""
        />
      ))
    } finally {
      setIsLoading(false)
    }
  }

  return {
    form,
    onSubmit,
    isLoading,
    t,
  }
}
