import vine from '@vinejs/vine'
const SectionValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2),
  })
)
export { SectionValidator }
