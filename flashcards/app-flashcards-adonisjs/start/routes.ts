import router from '@adonisjs/core/services/router'
import DecksController from '#controllers/decks_controller'
import CardsController from '#controllers/cards_controller'
import AuthController from '#controllers/auth_controller'
import { middleware } from './kernel.js'

router.get('/', [DecksController, 'index']).as('home')

router.post('/login', [AuthController, 'login']).as('auth.login')
router.post('/logout', [AuthController, 'logout']).as('auth.logout')

router.get('/decks', [DecksController, 'index']).as('deck.index')

router
  .group(() => {
    router.get('/deck/add', [DecksController, 'create']).as('deck.create')
    router.post('/deck/add', [DecksController, 'store']).as('deck.store')

    router.get('/deck/:id/edit', [DecksController, 'edit']).as('deck.edit')
    router.put('/deck/:id/update', [DecksController, 'update']).as('deck.update')
    router.delete('/deck/:id/destroy', [DecksController, 'destroy']).as('deck.destroy')

    router.post('/deck/:id/cards', [CardsController, 'store']).as('cards.store')
  })
  .use(middleware.auth())

router.get('/deck/:id', [DecksController, 'show']).as('deck.show')
