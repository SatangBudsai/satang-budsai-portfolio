import { wordRows } from '@/lib/pixel-font'

/**
 * The name in big pixel squares, the same font the commit grid spells it in.
 * Squares light up in a wave on hover (CSS only, `.wordmark` in globals.css).
 */
export default function PixelWordmark({ word = 'SATANG' }: { word?: string }) {
  const rows = wordRows(word)
  const columns = rows[0].length
  return (
    <div
      className='wordmark grid w-full gap-[0.35vw]'
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      role='img'
      aria-label={word}>
      {rows.flatMap((row, y) =>
        row.map((on, x) => (
          <span
            key={`${x}-${y}`}
            data-on={on || undefined}
            className='aspect-square'
            style={{ '--x': x, '--y': y } as React.CSSProperties}
          />
        ))
      )}
    </div>
  )
}
