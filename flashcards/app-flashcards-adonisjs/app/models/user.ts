import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import hash from '@adonisjs/core/services/hash' // Ensure you have this imported

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string // Note: lowercase 'string' is standard TS practice

  @column({ serializeAs: null }) // Good practice to hide password in JSON
  declare password: string

  // ... other columns

  /**
   * Static method to verify credentials
   */
  public static async verifyCredentials(name: string, password: string) {
    const user = await this.findBy('name', name)

    if (!user) {
      return null
    }

    const isValid = await hash.verify(user.password, password)

    if (!isValid) {
      return null
    }

    return user
  }
}
