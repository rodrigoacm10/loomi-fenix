'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2, Trash2 } from 'lucide-react'
import { useAuthStore } from '@/store/auth-store'
import api from '@/lib/api'

import { Button } from '@/components/ui/button'
import { SuccessToast } from '@/components/global/success-toast'
import { ErrorToast } from '@/components/global/error-toast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import Image from 'next/image'

export function DeleteUserDialog({ userId }: { userId: string }) {
  const t = useTranslations('UserPage')
  const { logout } = useAuthStore()
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!userId) return

    setIsDeleting(true)
    try {
      await api.delete(`/users/${userId}`)
      toast.custom((toastProps) => (
        <SuccessToast
          t={toastProps}
          title={t('successDeleteMessage')}
          description={t('successDeleteDesc')}
        />
      ))

      logout()
      router.push('/login')
    } catch (error) {
      console.error('Failed to delete user:', error)
      toast.custom((toastProps) => (
        <ErrorToast t={toastProps} title={t('deleteError')} description="" />
      ))
      setIsDeleting(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded-[15px] py-6"
        >
          <Trash2 className="w-5 h-5 mr-2" />
          {t('deleteAccount')}
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="!rounded-[24px] sm:max-w-106.25 text-white bg-loomi-bg-dark border-0"
      >
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-between pointer-events-none">
            <DialogTitle className="text-xl font-normal pointer-events-auto">
              {t('deleteConfirmTitle')}
            </DialogTitle>
            <DialogClose className="rounded-full hover:bg-white/10 cursor-pointer pointer-events-auto">
              <Image
                src="/icons/ticket/close.svg"
                alt="Close"
                width={45}
                height={45}
              />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
          <DialogDescription className="text-white text-sm">
            {t('deleteConfirmDesc')}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex mt-4 gap-2">
          <Button
            onClick={() =>
              document.dispatchEvent(
                new KeyboardEvent('keydown', { key: 'Escape' }),
              )
            }
            variant="ghost"
            className="ring-1 ring-inset w-25 p-6 rounded-[14px] hover:bg-black hover:ring-white hover:text-white"
          >
            {t('cancel')}
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-loomi-danger hover:bg-loomi-danger-hover w-25 p-6 rounded-[14px]"
          >
            {isDeleting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {t('confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
