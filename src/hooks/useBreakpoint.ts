import { useMediaQuery } from '@/hooks/use-media-query'
import { breakpoints } from '@/config/breakpoints'

const useBreakpoint = () => {
  const sm = breakpoints.sm
  const lg = breakpoints.lg

  const isMobile = useMediaQuery(`(max-width: ${sm})`)
  const isIpad = useMediaQuery(`(min-width: ${sm}) and (max-width: ${lg})`)
  const isDesktop = useMediaQuery(`(min-width: ${lg})`)

  return {
    isMobile,
    isIpad,
    isDesktop
  }
}

export default useBreakpoint
