import User from '#models/user'
import Deck from '#models/deck'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class DeckSeeder extends BaseSeeder {
  async run() {
    const user = await User.first()

    if (user) {
      await Deck.createMany([
        {
          name: 'JavaScript',
          description: 'Javascript Base',
          userId: user.id,
        },
        {
          name: 'History',
          description: 'WW2',
          userId: user.id,
        },
      ])
    }
  }
}
