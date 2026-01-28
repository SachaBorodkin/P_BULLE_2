import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare name: String
  @column()
  declare password: String
  @column()
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
