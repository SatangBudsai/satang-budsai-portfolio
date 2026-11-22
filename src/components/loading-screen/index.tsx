'use client'

import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Spinner } from '@/components/ui/spinner'

export default function LoadingScreen({ isLoading }: { isLoading: boolean }) {
  return (
    <Dialog open={isLoading} disablePointerDismissal onOpenChange={(_open, details) => details.cancel()}>
      <DialogContent
        showCloseButton={false}
        className='flex w-auto items-center justify-center border-0 bg-transparent p-8 text-primary shadow-none ring-0'>
        <DialogTitle className='sr-only'>Loading</DialogTitle>
        <DialogDescription className='sr-only'>Please wait while your request is processed.</DialogDescription>
        <Spinner className='size-10' />
      </DialogContent>
    </Dialog>
  )
}
