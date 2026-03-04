import vine from '@vinejs/vine'

export const decksValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3),
    description: vine.string().optional(),
  })
)
