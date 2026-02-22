'use client'

import Link from 'next/link'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForgotPasswordForm } from '@/hooks/use-forgot-password-form'

export default function ForgotPasswordForm() {
  const { form, onSubmit, isLoading, t } = useForgotPasswordForm()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  return (
    <div className="h-full w-full grid gap-6 space-y-4">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">{t('title')}</h1>
        <p className="">{t('description')}</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Input
              id="email"
              placeholder={t('emailPlaceholder')}
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register('email')}
              className="px-5 py-6 rounded-[15px] border-white/40"
            />
            {errors.email && (
              <p className="text-sm text-red-500 ml-5">
                {errors.email.message}
              </p>
            )}
          </div>

          <Button
            disabled={isLoading}
            className="mt-4 bg-loomi-secondary hover:bg-loomi-secondary-hover py-6 rounded-[15px]"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t('submit')}
          </Button>
        </div>
      </form>
      <div className="text-center text-sm">
        <Link
          href="/login"
          className="font-semibold text-loomi-primary hover:underline"
        >
          {t('backToLogin')}
        </Link>
      </div>
    </div>
  )
}
