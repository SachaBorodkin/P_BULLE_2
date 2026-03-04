import type { HttpContext } from '@adonisjs/core/http'
import Deck from '#models/deck'
import Card from '#models/card'
import { createCardValidator } from '#validators/card'

export default class CardsController {
  async create({ params, view, auth, response, session }: HttpContext) {
    const deck = await Deck.query()
      .where('id', params.deckId)
      .where('user_id', auth.user!.id)
      .first()

    if (!deck) {
      session.flash('error', "Accès refusé ou deck introuvable.")
      return response.redirect().toRoute('home')
    }

    return view.render('pages/cards/create', { deck })
  }

  async store({ request, response, session, auth }: HttpContext) {
    const payload = await request.validateUsing(createCardValidator)

    const deck = await Deck.query()
      .where('id', payload.deckId)
      .where('user_id', auth.user!.id)
      .first()

    if (!deck) {
      session.flash('error', "Accès refusé ou deck introuvable.")
      return response.redirect().toRoute('home')
    }

    await Card.create(payload)
    session.flash('success', 'La carte a été ajoutée avec succès !')
    return response.redirect().toRoute('decks.show', { id: payload.deckId })
  }

  async destroy({ params, response, session, auth }: HttpContext) {
    const card = await Card.findOrFail(params.id)
    const deck = await Deck.query()
      .where('id', card.deckId)
      .where('user_id', auth.user!.id)
      .first()

    if (!deck) {
      session.flash('error', "Accès refusé.")
      return response.redirect().toRoute('home')
    }

    const deckId = card.deckId
    await card.delete()
    session.flash('success', 'Carte supprimée !')
    return response.redirect().toRoute('decks.show', { id: deckId })
  }

  async edit({ params, view, auth, response, session }: HttpContext) {
    const card = await Card.findOrFail(params.id)
    const deck = await Deck.query()
      .where('id', card.deckId)
      .where('user_id', auth.user!.id)
      .first()

    if (!deck) {
      session.flash('error', "Accès refusé.")
      return response.redirect().toRoute('home')
    }

    return view.render('pages/cards/edit', { card, deck })
  }

  async update({ params, request, response, session, auth }: HttpContext) {
    const card = await Card.findOrFail(params.id)
    const deck = await Deck.query()
      .where('id', card.deckId)
      .where('user_id', auth.user!.id)
      .first()

    if (!deck) {
      session.flash('error', "Accès refusé.")
      return response.redirect().toRoute('home')
    }

    const payload = await request.validateUsing(createCardValidator)
    card.merge(payload)
    await card.save()
    session.flash('success', 'Carte modifiée avec succès !')
    return response.redirect().toRoute('decks.show', { id: card.deckId })
  }
}
