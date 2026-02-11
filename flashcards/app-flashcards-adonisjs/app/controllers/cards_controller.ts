// app/controllers/cards_controller.ts
import type { HttpContext } from '@adonisjs/core/http'
import Card from '#models/card'
import Deck from '#models/deck'

export default class CardsController {
  async store({ params, request, response, session }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)

    // Simple validation (can be moved to a dedicated validator file)
    const { question, answer } = request.only(['question', 'answer'])

    await Card.create({
      question,
      answer,
      deckId: deck.id,
    })

    session.flash('success', 'Carte ajoutée au deck !')
    return response.redirect().back()
  }
}
