/*
|--------------------------------------------------------------------------
| Le fichier des routes
|--------------------------------------------------------------------------
|
| Le fichier des routes a pour but de définir toutes les routes HTTP.
|
*/
import TeachersController from '#controllers/teachers_controller'
import AuthController from '#controllers/auth_controller'
import router from '@adonisjs/core/services/router'
router.get('/', [TeachersController, 'index']).as('home')
router.get('/teacher/:id/show', [TeachersController, 'show']).as('teacher.show')
router.delete('/teacher/:id/destroy', [TeachersController, 'destroy']).as('teacher.destroy')
router.get('/teacher/add', [TeachersController, 'create']).as('teacher.create')
// Route permettant l'ajout de l'enseignant
router.post('/teacher/add', [TeachersController, 'store']).as('teacher.store')
router.get('/teacher/:id/edit', [TeachersController, 'edit']).as('teacher.edit')
// Route permettant la modification de l'enseignant
router.put('/teacher/:id/update', [TeachersController, 'update']).as('teacher.update')
router.post('/login', [AuthController, 'login']).as('auth.login')
