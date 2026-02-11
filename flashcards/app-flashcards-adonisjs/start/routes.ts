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
router.post('/login', [AuthController, 'login']).as('auth.login')
router.post('/logout', [AuthController, 'logout']).as('auth.logout')
router.get('/decks', [DecksController, 'index']).as('deck.index')
router.get('/deck/:id', [DecksController, 'show']).as('deck.show')
router.group(() => {
  router.get('/deck/add', [DecksController, 'create']).as('deck.create')
  router.post('/deck/add', [DecksController, 'store']).as('deck.store')
  router.get('/deck/:id/edit', [DecksController, 'edit']).as('deck.edit')
  router.put('/deck/:id/update', [DecksController, 'update']).as('deck.update')
  router.delete('/deck/:id/destroy', [DecksController, 'destroy']).as('deck.destroy')
})
