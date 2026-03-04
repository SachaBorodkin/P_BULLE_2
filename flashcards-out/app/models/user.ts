import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave } from '@adonisjs/lucid/orm'
import hash from '@adonisjs/core/services/hash'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @beforeSave()
  static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await hash.make(user.password)
    }
  }

  public static async verifyCredentials(name: string, password: string) {
    const user = await this.findBy('name', name)
    if (!user) return null

    const valid = await hash.verify(user.password, password)
    if (!valid) return null

    return user
  }
}
