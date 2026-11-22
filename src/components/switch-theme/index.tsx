'use client'

import { useTheme } from 'next-themes'
import { Icon } from '@/components/ui/icon'
import { Button } from '@/components/ui/button'
import { appIcons } from '@/config/icons'

const SwitchTheme = () => {
  const { setTheme } = useTheme()

  return (
    <div className='relative flex'>
      <Button
        size='icon'
        variant='ghost'
        aria-label='Use dark theme'
        className='dark:hidden'
        onClick={() => setTheme('dark')}>
        <Icon icon={appIcons.sun} />
      </Button>
      <Button
        size='icon'
        variant='ghost'
        aria-label='Use light theme'
        onClick={() => setTheme('light')}
        className='hidden dark:inline-flex'>
        <Icon icon={appIcons.moon} />
      </Button>
    </div>
  )
}

export default SwitchTheme
