import Teacher from '#models/teacher'
import type { HttpContext } from '@adonisjs/core/http'

export default class TeachersController {
  /**
   * Afficher la liste des enseignants
   */
  async index({ view }: HttpContext) {
    const teachers = await Teacher.query().orderBy('lastname', 'asc').orderBy('firstname', 'asc')

    return view.render('pages/home', { teachers })
  }

  /**
   * Afficher les détails d'un enseignant spécifique
   */
  async show({ params, view }: HttpContext) {
    const teacher = await Teacher.query().where('id', params.id).preload('section').firstOrFail()

    return view.render('pages/teachers/show', { teacher })
  }

  /**
   * Afficher le formulaire d'édition
   */
  async edit({ params, view }: HttpContext) {
    const teacher = await Teacher.findOrFail(params.id)
    return view.render('pages/teachers/edit', { teacher })
  }

  /**
   * Traiter la modification de l'enseignant
   */
  async update({ params, request, response, session }: HttpContext) {
    // 1. Trouver l'enseignant ou renvoyer une erreur 404
    const teacher = await Teacher.findOrFail(params.id)

    // 2. Récupérer les données du formulaire
    // Note: Il est recommandé d'utiliser un Validator ici pour plus de sécurité
    const data = request.only(['firstname', 'lastname', 'sectionId'])

    // 3. Mettre à jour et sauvegarder
    teacher.merge(data)
    await teacher.save()

    // 4. Rediriger avec un message de succès
    session.flash('notification', 'Enseignant mis à jour avec succès')
    return response.redirect().toRoute('teachers.show', { id: teacher.id })
  }

  /**
   * Supprimer un enseignant
   */
  async destroy({ params, response, session }: HttpContext) {
    const teacher = await Teacher.findOrFail(params.id)

    await teacher.delete()

    session.flash('notification', 'Enseignant supprimé')
    return response.redirect().toRoute('teachers.index')
  }
}
