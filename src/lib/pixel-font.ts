/**
 * A 5×7 pixel font shared by the commit grid (activity-card.tsx) and the footer
 * wordmark (pixel-wordmark.tsx), so the name is always drawn in the same squares.
 */
export const GLYPHS: Record<string, string[]> = {
  S: ['.###.', '#...#', '#....', '.###.', '....#', '#...#', '.###.'],
  A: ['.###.', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  T: ['#####', '..#..', '..#..', '..#..', '..#..', '..#..', '..#..'],
  N: ['#...#', '##..#', '#.#.#', '#..##', '#...#', '#...#', '#...#'],
  G: ['.###.', '#...#', '#....', '#.###', '#...#', '#...#', '.####']
}

/** Rows of a word as booleans: 7 rows, 5 columns per letter with a 1-column gap. */
export function wordRows(word: string): boolean[][] {
  return Array.from({ length: 7 }, (_, row) =>
    [...word].flatMap((letter, index) => [
      ...[...(GLYPHS[letter]?.[row] ?? '.....')].map(pixel => pixel === '#'),
      ...(index < word.length - 1 ? [false] : [])
    ])
  )
}
