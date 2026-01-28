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
// La route de la homepage est accessible aussi bien à un utilisateur authentifié que non authentifié
router.get('/', [TeachersController, 'index']).as('home')
// Route permettant de voir les détails d'un enseignant
router
  .get('/teacher/:id/show', [TeachersController, 'show'])
  .as('teacher.show')
  .use(middleware.auth())
//route permettant de voir les détails d'une section
router.get('/section/:id/show', [SectionsController, 'show']).as('section.show')
//.use(middleware.auth())
// Toutes les routes de ce groupe sont soumises à l'authentification
router.group(() => {
  router.get('/section/add', [SectionsController, 'create']).as('section.create')
  router.post('/section/add', [SectionsController, 'store']).as('section.store')
  router.delete('/section/:id/destroy', [SectionsController, 'destroy']).as('.destroy')
})
router
  .group(() => {
    // Route permettant d'afficher le formulaire permettant l'ajout d'un enseignant
    router.get('/teacher/add', [TeachersController, 'create']).as('teacher.create')
    // Route permettant l'ajout de l'enseignant
    router.post('/teacher/add', [TeachersController, 'store']).as('teacher.store')
    // Route permettant d'afficher le formulaire permettant la mise à jour d'un enseignant
    router.get('/teacher/:id/edit', [TeachersController, 'edit']).as('teacher.edit')
    // Route permettant la modification de l'enseignant
    router.put('/teacher/:id/update', [TeachersController, 'update']).as('teacher.update')
    // Route permettant de supprimer un enseignant
    router.delete('/teacher/:id/destroy', [TeachersController, 'destroy']).as('teacher.destroy')
  })
  .use(middleware.auth())
  .use(middleware.ensureAdmin())
// Route permettant de se connecter accessible uniquement à un utilisateur non authentifié
router.post('/login', [AuthController, 'login']).as('auth.login').use(middleware.guest())
// Route permettant de se déconnecter accessible uniquement à un utilisateur authentifié
router.post('/logout', [AuthController, 'logout']).as('auth.logout').use(middleware.auth())
