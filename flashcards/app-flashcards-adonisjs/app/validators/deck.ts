import vine from '@vinejs/vine'

const decksValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2),
    description: vine.string().trim().minLength(2),
    userId: vine.number().positive(),
  })
)

export { decksValidator }
