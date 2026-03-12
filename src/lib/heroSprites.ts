export type PixelColor = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
export type PixelSprite = PixelColor[][]

export const COLOR_MAP: Record<PixelColor, string> = {
  0: 'transparent',
  1: '#F5C5A3', // skin
  2: '#2D1B00', // dark hair / outline
  3: '#4A90D9', // armor blue
  4: '#FFD700', // gold accent
  5: '#FFFFFF', // white / eyes
  6: '#FF6B00', // orange shadow
  7: '#A0C0E0'  // armor highlight
}

// 16×16 RPG hero sprite
export const HERO_SPRITE: PixelSprite = [
  [0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0],
  [0, 0, 2, 4, 4, 4, 4, 4, 4, 4, 4, 2, 0, 0, 0, 0],
  [0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0],
  [0, 0, 2, 1, 5, 5, 1, 1, 5, 5, 1, 2, 0, 0, 0, 0],
  [0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0],
  [0, 0, 2, 1, 1, 4, 4, 4, 4, 1, 1, 2, 0, 0, 0, 0],
  [0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0],
  [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0],
  [3, 7, 3, 4, 3, 3, 3, 3, 3, 3, 4, 3, 7, 3, 0, 0],
  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0],
  [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0],
  [0, 0, 3, 3, 0, 3, 3, 3, 3, 3, 0, 3, 3, 0, 0, 0],
  [0, 0, 3, 3, 0, 3, 3, 3, 3, 3, 0, 3, 3, 0, 0, 0],
  [0, 0, 6, 3, 0, 0, 0, 0, 0, 0, 0, 3, 6, 0, 0, 0],
  [0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0],
  [0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0]
]

// 16×16 waving hero sprite (arm raised)
export const HERO_WAVE_SPRITE: PixelSprite = [
  [0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0],
  [0, 0, 2, 4, 4, 4, 4, 4, 4, 4, 4, 2, 0, 0, 0, 0],
  [0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0],
  [0, 0, 2, 1, 5, 5, 1, 1, 5, 5, 1, 2, 0, 0, 0, 0],
  [0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0],
  [0, 0, 2, 1, 1, 4, 4, 4, 4, 1, 1, 2, 0, 0, 0, 0],
  [0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0],
  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0],
  [3, 7, 3, 4, 3, 3, 3, 3, 3, 3, 4, 3, 7, 3, 0, 0],
  [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
  [0, 0, 3, 3, 0, 3, 3, 3, 3, 3, 0, 3, 3, 0, 0, 0],
  [0, 0, 3, 3, 0, 3, 3, 3, 3, 3, 0, 3, 3, 0, 0, 0],
  [0, 0, 6, 3, 0, 0, 0, 0, 0, 0, 0, 3, 6, 0, 0, 0],
  [0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0],
  [0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0]
]

export function drawSprite(
  ctx: CanvasRenderingContext2D,
  sprite: PixelSprite,
  x: number,
  y: number,
  scale: number = 4,
  colorOverride?: Partial<Record<PixelColor, string>>
): void {
  const colors = { ...COLOR_MAP, ...colorOverride }
  sprite.forEach((row, ri) => {
    row.forEach((pixel, ci) => {
      if (pixel === 0) return
      const color = colors[pixel]
      if (!color || color === 'transparent') return
      ctx.fillStyle = color
      ctx.fillRect(x + ci * scale, y + ri * scale, scale, scale)
    })
  })
}

export function spriteToSvg(
  sprite: PixelSprite,
  scale: number = 4,
  colorOverride?: Partial<Record<PixelColor, string>>
): string {
  const colors = { ...COLOR_MAP, ...colorOverride }
  const w = sprite[0].length * scale
  const h = sprite.length * scale
  const rects = sprite
    .flatMap((row, ri) =>
      row
        .filter(pixel => pixel !== 0)
        .map((pixel, ci) => {
          const color = colors[pixel]
          if (!color || color === 'transparent') return ''
          return `<rect x="${ci * scale}" y="${ri * scale}" width="${scale}" height="${scale}" fill="${color}"/>`
        })
        .filter(Boolean)
    )
    .join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges">${rects}</svg>`
}
