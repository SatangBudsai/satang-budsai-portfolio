'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'

/** A soft fade between pages. Opacity only: a transform here would trap fixed-position elements. */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  )
}
