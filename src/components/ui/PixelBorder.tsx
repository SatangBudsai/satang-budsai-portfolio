import React, { CSSProperties, ReactNode } from 'react'

type Props = {
  children: ReactNode
  active?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
  style?: CSSProperties
  as?: keyof React.JSX.IntrinsicElements
}

const sizeMap = {
  sm: '2px',
  md: '3px',
  lg: '4px'
}

export default function PixelBorder({
  children,
  active = false,
  size = 'md',
  className = '',
  style,
  as: Tag = 'div'
}: Props) {
  const borderWidth = sizeMap[size]
  const borderColor = active ? 'var(--px-border-active)' : 'var(--px-border)'
  const shadow = active ? 'var(--px-shadow-lg)' : 'var(--px-shadow)'

  return (
    <Tag
      className={className}
      style={{
        border: `${borderWidth} solid ${borderColor}`,
        boxShadow: shadow,
        background: 'var(--px-bg-panel)',
        imageRendering: 'pixelated',
        ...style
      }}
    >
      {children}
    </Tag>
  )
}
