import router from '@adonisjs/core/services/router'
import DecksController from '#controllers/decks_controller'
import CardsController from '#controllers/cards_controller'
import AuthController from '#controllers/auth_controller'
const { middleware } = await import('@adonisjs/core/services/server')

// Auth routes (guest only)
router
  .get('/login', [AuthController, 'showLogin'])
  .as('auth.login.show')
  .use(middleware.guest())
router.post('/login', [AuthController, 'login']).as('auth.login').use(middleware.guest())
router.post('/logout', [AuthController, 'logout']).as('auth.logout').use(middleware.auth())

// Public home (shows only logged-in user's decks, or redirects to login)
router.get('/', [DecksController, 'index']).as('home').use(middleware.auth())

// Protected deck routes
router
  .group(() => {
    router.get('/decks/create', [DecksController, 'create']).as('decks.create')
    router.get('/decks/:id/edit', [DecksController, 'edit']).as('decks.edit')
    router.get('/deck/:id', [DecksController, 'show']).as('decks.show')
    router.post('/decks', [DecksController, 'store']).as('decks.store')
    router.post('/decks/:id/update', [DecksController, 'update']).as('decks.update')
    router.post('/decks/:id', [DecksController, 'destroy']).as('decks.destroy')

    router.get('/decks/:deckId/cards-add', [CardsController, 'create']).as('cards.create')
    router.post('/cards', [CardsController, 'store']).as('cards.store')
    router.delete('/cards/:id', [CardsController, 'destroy']).as('cards.destroy')
    router.get('/cards/:id/edit', [CardsController, 'edit']).as('cards.edit')
    router.put('/cards/:id', [CardsController, 'update']).as('cards.update')
  })
  .use(middleware.auth())
