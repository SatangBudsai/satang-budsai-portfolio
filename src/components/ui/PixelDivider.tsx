type Props = {
  color?: string
  flip?: boolean
  height?: number
}

export default function PixelDivider({
  color = 'var(--px-bg-panel)',
  flip = false,
  height = 20
}: Props) {
  const segments = 50
  const segW = 100 / segments

  const points: string[] = []
  for (let i = 0; i <= segments; i++) {
    const x = (i * segW).toFixed(2)
    const y = i % 2 === 0 ? 0 : height
    points.push(`${x},${y}`)
  }

  const polyline = points.join(' ')
  const path = `M0,${height} L${polyline} L100,${height} Z`

  return (
    <div
      style={{
        transform: flip ? 'scaleY(-1)' : 'none',
        lineHeight: 0,
        display: 'block',
        overflow: 'hidden'
      }}
    >
      <svg
        viewBox={`0 0 100 ${height}`}
        preserveAspectRatio='none'
        width='100%'
        height={height}
        xmlns='http://www.w3.org/2000/svg'
        style={{ display: 'block', imageRendering: 'pixelated' }}
      >
        <path d={path} fill={color} />
      </svg>
    </div>
  )
}
