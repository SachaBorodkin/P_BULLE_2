import type { HttpContext } from '@adonisjs/core/http'
import Deck from '#models/deck'
import Card from '#models/card'
import { createCardValidator } from '#validators/card'

export default class CardsController {
  async create({ params, view }: HttpContext) {
    const deck = await Deck.findOrFail(params.deckId)
    return view.render('pages/cards/create', { deck })
  }

  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(createCardValidator)
    await Card.create(payload)
    session.flash('success', 'La carte a été ajoutée avec succès !')
    return response.redirect().toRoute('decks.show', { id: payload.deckId })
  }

  async destroy({ params, response, session }: HttpContext) {
    const card = await Card.findOrFail(params.id)
    const deckId = card.deckId
    await card.delete()
    session.flash('success', 'Carte supprimée !')
    return response.redirect().toRoute('decks.show', { id: deckId })
  }

  async edit({ params, view }: HttpContext) {
    const card = await Card.findOrFail(params.id)
    // Load the deck so we can display context and pass deckId to the form
    const deck = await Deck.findOrFail(card.deckId)
    return view.render('pages/cards/edit', { card, deck })
  }

  async update({ params, request, response, session }: HttpContext) {
    const card = await Card.findOrFail(params.id)
    const payload = await request.validateUsing(createCardValidator)
    card.merge(payload)
    await card.save()
    session.flash('success', 'Carte modifiée avec succès !')
    return response.redirect().toRoute('decks.show', { id: card.deckId })
  }
}
