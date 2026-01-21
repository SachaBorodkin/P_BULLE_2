import Teacher from '#models/teacher'
import Section from '#models/section'
import type { HttpContext } from '@adonisjs/core/http'
import { teacherValidator } from '#validators/teacher'
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
  async create({ view }: HttpContext) {
    // Récupération des sections triées par le nom
    const sections = await Section.query().orderBy('name', 'asc')
    // Appel de la vue
    return view.render('pages/teachers/create', { title: "Ajout d'un enseignant", sections })
  }
  /**
   * Gérer la soumission du formulaire pour la création d'un enseignant
   */
  async store({ request, session, response }: HttpContext) {
    // Validation des données saisies par l'utilisateur
    const { gender, firstname, lastname, nickname, origine, sectionId } =
      await request.validateUsing(teacherValidator)
    // Création du nouvel enseignant
    const teacher = await Teacher.create({
      gender,
      firstname,
      lastname,
      nickname,
      origine,
      sectionId,
    })
    // Afficher un message à l'utilisateur
    session.flash(
      'success',
      `Le nouvel enseignant ${teacher.lastname}
${teacher.firstname} a été ajouté avec succès !`
    )
    // Rediriger vers la homepage
    return response.redirect().toRoute('home')
  }
  /**
   * Afficher le formulaire d'édition
   */
  async edit({ params, view }: HttpContext) {
    // Sélectionner l'enseignant dont on veut mettre à jour des informations
    const teacher = await Teacher.findOrFail(params.id)
    // Récupération des sections triées par le nom
    const sections = await Section.query().orderBy('name', 'asc')
    // Afficher la vue
    return view.render('pages/teachers/edit.edge', {
      title: 'Modifier un enseignant',
      teacher,
      sections,
    })
  }
  async update({ params, request, session, response }: HttpContext) {
    // Validation des données saisies par l'utilisateur
    const { gender, firstname, lastname, nickname, origine, sectionId } =
      await request.validateUsing(teacherValidator)
    // Sélectionner l'enseignant dont on veut mettre à jour des informations
    const teacher = await Teacher.findOrFail(params.id)
    // Met à jour les infos de l'enseignant
    teacher.merge({
      gender,
      firstname,
      lastname,
      nickname,
      origine,
      sectionId,
    })
    const teacherUpdated = await teacher.save()
    // Afficher un message à l'utilisateur
    session.flash(
      'success',
      `L'enseignant ${teacherUpdated.lastname} ${teacherUpdated.firstname} a été
mis à jour avec succès !`
    )
    // Redirige l'utilisateur sur la home
    return response.redirect().toRoute('home')
  }
  /**
   * Traiter la modification de l'enseignant
   */
  /**
   * Supprimer un enseignant
   */
  async destroy({ params, response, session }: HttpContext) {
    const teacher = await Teacher.findOrFail(params.id)

    await teacher.delete()

    session.flash(
      'success',
      `L'enseignant ${teacher.lastname} ${teacher.firstname} a été supprimé avec
succès !`
    )
    // Redirige l'utilisateur sur la home
    return response.redirect().toRoute('home')
  }
}
