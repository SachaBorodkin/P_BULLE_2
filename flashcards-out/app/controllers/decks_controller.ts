import type { HttpContext } from '@adonisjs/core/http'
import { decksValidator } from '#validators/deck'
import Deck from '#models/deck'

export default class DecksController {
  async index({ view, auth }: HttpContext) {
    const user = auth.user!
    const decks = await Deck.query()
      .where('user_id', user.id)
      .withCount('cards')
      .orderBy('updated_at', 'desc')
    return view.render('pages/home', { decks })
  }

  async show({ params, view, auth, response, session }: HttpContext) {
    const deck = await Deck.query()
      .where('id', params.id)
      .where('user_id', auth.user!.id)
      .preload('cards')
      .first()

    if (!deck) {
      session.flash('error', "Ce deck n'existe pas ou vous n'avez pas accès.")
      return response.redirect().toRoute('home')
    }

    return view.render('pages/decks/show', { deck })
  }

  async create({ view }: HttpContext) {
    return view.render('pages/decks/create', {
      title: "Ajout d'un deck",
    })
  }

  async store({ request, response, session, auth }: HttpContext) {
    const data = await request.validateUsing(decksValidator)
    await Deck.create({ ...data, userId: auth.user!.id })
    session.flash('success', 'Deck créé avec succès !')
    return response.redirect().toRoute('home')
  }

  async edit({ params, view, auth, response, session }: HttpContext) {
    const deck = await Deck.query()
      .where('id', params.id)
      .where('user_id', auth.user!.id)
      .first()

    if (!deck) {
      session.flash('error', "Accès refusé ou deck introuvable.")
      return response.redirect().toRoute('home')
    }

    return view.render('pages/decks/edit', { deck })
  }

  async update({ params, request, session, response, auth }: HttpContext) {
    const payload = await request.validateUsing(decksValidator)
    const deck = await Deck.query()
      .where('id', params.id)
      .where('user_id', auth.user!.id)
      .first()

    if (!deck) {
      session.flash('error', "Accès refusé ou deck introuvable.")
      return response.redirect().toRoute('home')
    }

    deck.merge(payload)
    await deck.save()

    session.flash('success', `Le deck "${deck.name}" a été mis à jour !`)
    return response.redirect().toRoute('decks.show', { id: deck.id })
  }

  async destroy({ params, response, session, auth }: HttpContext) {
    const deck = await Deck.query()
      .where('id', params.id)
      .where('user_id', auth.user!.id)
      .first()

    if (!deck) {
      session.flash('error', "Accès refusé ou deck introuvable.")
      return response.redirect().toRoute('home')
    }

    const deckName = deck.name
    await deck.related('cards').query().delete()
    await deck.delete()

    session.flash('success', `Le deck "${deckName}" a été supprimé !`)
    return response.redirect().toRoute('home')
  }
}
