'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
import Image from 'next/image'
import { TicketForm } from './ticket-form'
import { useTicketStore } from '@/store/ticket-store'
import { useTranslations } from 'next-intl'

export function TicketDialog() {
  const { isTicketModalOpen, closeTicketModal, selectedTicket, isViewMode } =
    useTicketStore()
  const t = useTranslations('TicketForm')

  return (
    <Dialog
      open={isTicketModalOpen}
      onOpenChange={(open) => !open && closeTicketModal()}
    >
      <DialogContent
        showCloseButton={false}
        className="!rounded-[24px] sm:max-w-125 text-white bg-loomi-bg-dark border-0"
      >
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-between pointer-events-none">
            <DialogTitle className="text-xl font-normal pointer-events-auto">
              {isViewMode
                ? t('viewTicket')
                : selectedTicket
                  ? t('editTicket')
                  : t('newTicket')}
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
            {t('dialogDescription')}
          </DialogDescription>
        </DialogHeader>
        <TicketForm key={selectedTicket ? selectedTicket.id : 'new-ticket'} />
      </DialogContent>
    </Dialog>
  )
}
