/*
|--------------------------------------------------------------------------
| Le fichier des routes
|--------------------------------------------------------------------------
|
| Le fichier des routes a pour but de définir toutes les routes HTTP.
|
*/
import AuthController from '#controllers/auth_controller'
import TeachersController from '#controllers/teachers_controller'
import SectionsController from '#controllers/sections_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

// La route de la homepage
router.get('/', [TeachersController, 'index']).as('home')

router
  .get('/teacher/:id/show', [TeachersController, 'show'])
  .as('teacher.show')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/teacher/add', [TeachersController, 'create']).as('teacher.create')
    router.post('/teacher/add', [TeachersController, 'store']).as('teacher.store')
    router.get('/teacher/:id/edit', [TeachersController, 'edit']).as('teacher.edit')
    router.put('/teacher/:id/update', [TeachersController, 'update']).as('teacher.update')
    router.delete('/teacher/:id/destroy', [TeachersController, 'destroy']).as('teacher.destroy')
  })
  .use(middleware.auth())
  .use(middleware.ensureAdmin())

router.get('/sections', [SectionsController, 'index']).as('section.index')

// Route pour voir les détails d'une section
router.get('/section/:id/show', [SectionsController, 'show']).as('section.show')

router
  .group(() => {
    router.get('/section/add', [SectionsController, 'create']).as('section.create')
    router.post('/section/add', [SectionsController, 'store']).as('section.store')
    router.delete('/section/:id/destroy', [SectionsController, 'destroy']).as('section.destroy')
  })
  .use(middleware.auth())

// --- ROUTES AUTH ---
router.post('/login', [AuthController, 'login']).as('auth.login').use(middleware.guest())
router.post('/logout', [AuthController, 'logout']).as('auth.logout').use(middleware.auth())
