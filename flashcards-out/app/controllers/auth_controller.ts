import type { HttpContext } from '@adonisjs/core/http'
import { loginUserValidator } from '#validators/auth'
import User from '#models/user'

/**
 * Controller pour l'authentification
 */
export default class AuthController {
  /**
   * Afficher la page de connexion
   */
  async showLogin({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  /**
   * Gérer la connexion d'un utilisateur
   */
  async login({ request, auth, session, response }: HttpContext) {
    const { username, password } = await request.validateUsing(loginUserValidator)
    const user = await User.verifyCredentials(username, password)

    if (!user) {
      session.flash('error', 'Identifiants invalides. Veuillez réessayer.')
      return response.redirect().back()
    }

    await auth.use('web').login(user)
    session.flash('success', `Bienvenue, ${user.name} !`)
    return response.redirect().toRoute('home')
  }

  async logout({ auth, session, response }: HttpContext) {
    await auth.use('web').logout()
    session.flash('success', 'Vous avez été déconnecté avec succès.')
    return response.redirect().toRoute('auth.login.show')
  }
}
