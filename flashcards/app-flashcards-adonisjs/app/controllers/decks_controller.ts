import type { HttpContext } from '@adonisjs/core/http'
import { decksValidator } from '#validators/deck'
import Deck from '#models/deck'
/*import Card from '#models/card'
import User from '#models/user'*/

export default class DecksController {
  /**
   * Afficher la liste des decks
   */
  async index({ view }: HttpContext) {
    const decks = await Deck.query().orderBy('updated_at', 'asc')

    return view.render('pages/home', { decks })
  }
}
