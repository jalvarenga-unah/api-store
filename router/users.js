import { Router } from 'express'
import { UserController } from '../controllers/user-controller.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import isAdmin from '../middlewares/isAdmin.js'

const userRouter = Router()

// se aplica el middleware de autenticación a todas las rutas de este router
// userRouter.use(authMiddleware)

// si quiero que una ruta tenga un middleware en específico,
//  se lo paso como segundo argumento
userRouter.get('/', /*authMiddleware,*/ UserController.getAllUsers)

userRouter.get('/:user_id', UserController.getUserById)

userRouter.post('/', [authMiddleware, isAdmin], UserController.createUser)

userRouter.patch('/:id', [authMiddleware, isAdmin], UserController.updateUser)

// userRouter.delete('/:id', (req, res) => {
//     //.....
// })

export default userRouter