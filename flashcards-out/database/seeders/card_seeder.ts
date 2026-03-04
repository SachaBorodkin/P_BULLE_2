import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'

export default class CardSeeder extends BaseSeeder {
  async run() {
    const deck = await db.from('decks').first()

    if (deck) {
      await db.table('cards').insert([
        {
          question: 'What is the syntax of function',
          answer: 'function(){}',
          deck_id: deck.id,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          question: 'What is the annexation of Austria by Germany called?',
          answer: 'Anschluss',
          deck_id: deck.id,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ])
    }
  }
}
