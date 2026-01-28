import vine from '@vinejs/vine'
const decksValidator = vine.compile(
  vine.object({
    // Utilisation d'un enum pour le genre
    name: vine.string().trim().minLength(2),
    description: vine.string().trim().minLength(2),
    user_Id: vine.number().positive(),
  })
)
export { decksValidator }
