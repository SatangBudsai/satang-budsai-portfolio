type ColorKey = 'gold' | 'cyan' | 'green' | 'pink'

type Props = {
  label: string
  value: number
  max?: number
  color?: ColorKey
  showValue?: boolean
}

const colorVarMap: Record<ColorKey, string> = {
  gold: 'var(--px-gold)',
  cyan: 'var(--px-cyan)',
  green: 'var(--px-green)',
  pink: 'var(--px-pink)'
}

export default function StatBar({ label, value, max = 100, color = 'gold', showValue = true }: Props) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  const barColor = colorVarMap[color]

  return (
    <div style={{ fontFamily: 'var(--font-press-start)', fontSize: '8px', marginBottom: '8px', willChange: 'transform' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '4px',
          color: 'var(--px-text-secondary)'
        }}
      >
        <span>{label}</span>
        {showValue && (
          <span style={{ color: barColor }}>
            {value}/{max}
          </span>
        )}
      </div>
      <div
        style={{
          width: '100%',
          height: '8px',
          background: 'var(--px-border-subtle)',
          border: '2px solid var(--px-border-subtle)',
          imageRendering: 'pixelated'
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            background: barColor,
            imageRendering: 'pixelated',
            transition: 'width 0.6s steps(12)'
          }}
        />
      </div>
    </div>
  )
}
