import Image from 'next/image'

import { cn } from '@/lib/utils'

/**
 * The profile photo as a slightly tilted print with a handwritten caption.
 * It straightens up and lifts on hover.
 */
export default function ProfilePhoto({
  src,
  alt,
  caption,
  className,
  priority
}: {
  src: string
  alt: string
  caption: string
  className?: string
  priority?: boolean
}) {
  return (
    <figure
      className={cn(
        'group relative w-36 shrink-0 rotate-[-4deg] rounded-[1.25rem] bg-[#f4f1fb] p-2 pb-9 shadow-[0_24px_60px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.08)] transition-transform duration-500 ease-out-expo hover:-translate-y-1 hover:rotate-0 sm:w-44',
        className
      )}>
      <div className='overflow-hidden rounded-[0.9rem]'>
        <Image
          src={src}
          alt={alt}
          width={480}
          height={600}
          priority={priority}
          sizes='(min-width: 640px) 176px, 144px'
          className='aspect-[4/5] h-auto w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]'
        />
      </div>
      <figcaption className='absolute inset-x-0 bottom-1.5 text-center font-hand text-xl text-[#2a1f45]'>
        {caption}
      </figcaption>
      <span
        className='absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 rotate-[3deg] rounded-sm bg-primary/70 backdrop-blur-sm'
        aria-hidden='true'
      />
    </figure>
  )
}
