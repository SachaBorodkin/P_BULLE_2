import type { HttpContext } from '@adonisjs/core/http'
import { decksValidator } from '#validators/deck'
import Deck from '#models/deck'

export default class DecksController {
  /**
   * Afficher la liste des decks avec le nombre de cartes
   */
  async index({ view }: HttpContext) {
    const decks = await Deck.query().withCount('cards').orderBy('updated_at', 'desc')
    return view.render('pages/home', { decks })
  }

  async show({ params, view }: HttpContext) {
    const deck = await Deck.query().where('id', params.id).preload('cards').firstOrFail()
    return view.render('pages/decks/show', { deck })
  }

  async create({ view }: HttpContext) {
    return view.render('pages/decks/create', { title: "Ajout d'un deck" })
  }

  async store({ request, session, auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(decksValidator)

    const deck = await Deck.create({
      ...payload,
      userId: user.id, // Ensure userId is provided to the model
    })

    session.flash('success', 'Deck créé avec succès')
    return response.redirect().toRoute('deck.show', { id: deck.id })
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
    return response.redirect().toRoute('home')
  }
  async destroy({ params, response, session }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)

    await deck.delete()

    session.flash(
      'success',
      `Le deck ${deck.name} a été supprimé avec
succès !`
    )
    return response.redirect().toRoute('home')
  }
}
