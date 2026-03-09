/**
 * Zod validation schemas — shared input/output validation.
 * Pure data validation, no framework dependencies.
 */

import { z } from 'zod'

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(25),
})

export type PaginationInput = z.infer<typeof paginationSchema>

export const idParamSchema = z.object({
  id: z.string().uuid(),
})
