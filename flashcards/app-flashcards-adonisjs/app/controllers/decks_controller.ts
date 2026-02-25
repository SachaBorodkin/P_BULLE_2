import type { HttpContext } from '@adonisjs/core/http'
import { decksValidator } from '#validators/deck'
import Deck from '#models/deck'

export default class DecksController {
  async index({ view }: HttpContext) {
    const decks = await Deck.query().withCount('cards').orderBy('updated_at', 'desc')
    return view.render('pages/home', { decks })
  }

  async show({ params, view }: HttpContext) {
    const deck = await Deck.query().where('id', params.id).preload('cards').firstOrFail()
    return view.render('pages/decks/show', { deck })
  }

  async create({ view }: HttpContext) {
    return view.render('pages/decks/create', {
      title: "Ajout d'un deck",
    })
  }

  async store({ request, response, session }: HttpContext) {
    const data = await request.validateUsing(decksValidator)
    await Deck.create({ ...data, userId: 1 })
    session.flash('success', 'Deck created!')
    return response.redirect().toRoute('home')
  }

  async edit({ params, view }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)
    return view.render('pages/decks/edit', { deck })
  }

  async update({ params, request, session, response }: HttpContext) {
    const payload = await request.validateUsing(decksValidator)
    const deck = await Deck.findOrFail(params.id)

    deck.merge(payload)
    await deck.save()

    session.flash('success', `Le deck ${deck.name} a été mis à jour !`)
    return response.redirect().toRoute('decks.show', { id: deck.id }) // ← was 'show'
  }

  async destroy({ params, response, session }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)
    const deckName = deck.name

    await deck.related('cards').query().delete() // delete associated cards first
    await deck.delete()

    session.flash('success', `Le deck "${deckName}" a été supprimé !`)
    return response.redirect().toRoute('home')
  }
}
