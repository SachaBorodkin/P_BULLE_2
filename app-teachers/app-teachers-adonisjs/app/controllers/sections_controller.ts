import Teacher from '#models/teacher'
import Section from '#models/section'
import type { HttpContext } from '@adonisjs/core/http'
import { SectionValidator } from '#validators/section'
export default class Sections {
  /**
   * Afficher la liste des sections
   */
  async index({ view }: HttpContext) {
    const sections = await Section.query().orderBy('name', 'asc')

    return view.render('pages/sections', { sections })
  }

  /**
   * Afficher les détails d'un enseignant spécifique
   */
  async show({ params, view }: HttpContext) {
    const section = await Section.query().where('id', params.id).firstOrFail()

    return view.render('pages/sections/show', { section })
  }
  async create({ view }: HttpContext) {
    // Récupération des sections triées par le nom
    const sections = await Section.query().orderBy('name', 'asc')
    // Appel de la vue
    return view.render('pages/sections/create', { title: "Ajout d'une section" })
  }
  /**
   * Gérer la soumission du formulaire pour la création d'un enseignant
   */
  async store({ request, session, response }: HttpContext) {
    // Validation des données saisies par l'utilisateur
    const { name } = await request.validateUsing(SectionValidator)
    // Création de la nouvele section
    const section = await Section.create({
      name,
    })
    // Afficher un message à l'utilisateur
    session.flash('success', `La section ${section.name} a été ajouté avec succès !`)
    // Rediriger vers la homepage
    return response.redirect().toRoute('home')
  }
  /**
   * Supprimer une section
   */
  async destroy({ params, response, session }: HttpContext) {
    const section = await Section.findOrFail(params.id)

    await section.delete()

    session.flash(
      'success',
      `La section ${section.name} a été supprimé avec
succès !`
    )
    // Redirige l'utilisateur sur la home
    return response.redirect().toRoute('home')
  }
}
