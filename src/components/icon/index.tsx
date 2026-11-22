// ** Icon Imports
import { Icon, type IconProps } from '@/components/ui/icon'

const IconifyIcon = ({ icon, ...rest }: IconProps) => {
  return <Icon icon={icon} fontSize='1.375rem' {...rest} />
}

export default IconifyIcon
