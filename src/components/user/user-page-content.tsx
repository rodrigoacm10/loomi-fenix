'use client'

import { Loader2, LogOut, Save, Camera } from 'lucide-react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Container from '@/components/global/container'
import { DeleteUserDialog } from '@/components/user/delete-user-dialog'
import { SkeletonUser } from '@/components/user/skeleton-user'
import LanguageSelector from '@/components/global/language-selector'
import { useUserForm } from '@/hooks/use-user-form'

export function UserPageContent() {
  const {
    form,
    onSubmit,
    handleLogout,
    initials,
    userId,
    isLoading,
    isSaving,
    t,
  } = useUserForm()

  if (isLoading) {
    return <SkeletonUser />
  }

  return (
    <div className="flex w-full justify-center">
      <Container className="max-w-150 w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">{t('title')}</h1>
          <LanguageSelector />
        </div>
        <div className="flex flex-col items-center justify-center space-y-4 relative">
          <div className="relative group cursor-pointer">
            <div className="h-32 w-32 border-4 border-loomi-primary rounded-full flex">
              <div className="bg-loomi-primary text-white text-4xl font-semibold rounded-full flex-1 flex items-center justify-center">
                <p>{initials}</p>{' '}
              </div>
            </div>
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pl-4 font-semibold">
                    {t('nameLabel')}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="px-5 py-6 mt-1 rounded-4xl bg-loomi-bg-card border-white/10"
                      placeholder={t('namePlaceholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pl-4 font-semibold">
                    {t('emailLabel')}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="px-5 py-6 mt-1 rounded-4xl bg-loomi-bg-card border-white/10"
                      placeholder={t('emailPlaceholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Button
                type="submit"
                disabled={isSaving}
                className="flex-1 bg-loomi-primary hover:bg-loomi-primary-hover w-25 p-6 rounded-[14px]"
              >
                {isSaving ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <Save className="w-5 h-5 mr-2" />
                )}
                {t('save')}
              </Button>

              <Button
                type="button"
                onClick={handleLogout}
                variant="ghost"
                className="flex-1 ring-1 ring-inset w-25 p-6 rounded-[14px] hover:bg-black hover:ring-white hover:text-white"
              >
                <LogOut className="w-5 h-5 mr-2" />
                {t('logout')}
              </Button>
            </div>
          </form>
        </Form>

        <div className="pt-8 mt-8 border-t border-white/10">
          <DeleteUserDialog userId={userId} />
        </div>
      </Container>
    </div>
  )
}
