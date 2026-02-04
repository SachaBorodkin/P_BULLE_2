/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import DecksController from '#controllers/decks_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import AuthController from '#controllers/auth_controller'

router.on('/').render('pages/home')
router.post('/login', [AuthController, 'login']).as('auth.login').use(middleware.guest())
router.post('/logout', [AuthController, 'logout']).as('auth.logout').use(middleware.auth())
