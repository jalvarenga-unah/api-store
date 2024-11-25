import { Router } from 'express'
import { AuthController } from '../controllers/auth-controller.js'


const authRouter = Router()

// POST: Crear un recurso
authRouter.post('/', AuthController.authuser)

export default authRouter   