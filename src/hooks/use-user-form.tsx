import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuthStore } from '@/store/auth-store'
import api from '@/lib/api'
import { SuccessToast } from '@/components/global/success-toast'
import { ErrorToast } from '@/components/global/error-toast'
import { userSchema, UserValues } from '@/schemas/user-schema'

export function useUserForm() {
  const t = useTranslations('UserPage')
  const { user, logout } = useAuthStore()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [userId, setUserId] = useState<string>('')
  const [nameInitials, setNameInitials] = useState('')

  const form = useForm<UserValues>({
    resolver: zodResolver(userSchema),
    defaultValues: { name: '', email: '' },
  })

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.email) return

      try {
        const response = await api.get(`/users/by-email/${user.email}`)
        const data = response.data
        if (data && data.id) {
          setUserId(data.id)
          form.reset({ name: data.name || '', email: data.email || '' })
          setNameInitials(data.name || '')
        }
      } catch (error) {
        console.error('Failed to fetch user by email:', error)
        toast.custom((toastProps) => (
          <ErrorToast t={toastProps} title={t('fetchError')} description="" />
        ))
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [user?.email, t, form])

  const onSubmit = async (data: UserValues) => {
    if (!userId) return

    setIsSaving(true)
    try {
      await api.patch(`/users/${userId}`, {
        name: data.name,
        email: data.email,
        state: 'CONFIRMED',
      })
      setNameInitials(data.name)
      toast.custom((toastProps) => (
        <SuccessToast
          t={toastProps}
          title={t('successUpdateMessage')}
          description={t('successUpdateDesc')}
        />
      ))
    } catch (error) {
      console.error('Failed to update user:', error)
      toast.custom((toastProps) => (
        <ErrorToast t={toastProps} title={t('updateError')} description="" />
      ))
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const initials = nameInitials
    ? nameInitials
        .split(' ')
        .map((n) => n.charAt(0))
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : 'AA'

  return {
    form,
    onSubmit,
    handleLogout,
    initials,
    userId,
    isLoading,
    isSaving,
    t,
  }
}
