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

router.get('/', [DecksController, 'index']).as('home')
router.post('/login', [AuthController, 'login']).as('auth.login').use(middleware.guest())
router.post('/logout', [AuthController, 'logout']).as('auth.logout').use(middleware.auth())
// Add this to handle the list of decks and specific deck views
router.get('/decks', [DecksController, 'index']).as('decks.index')
router.get('/decks/:id', [DecksController, 'show']).as('decks.show')
