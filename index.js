import express, { json } from 'express'
import userRouter from './router/users.js'
import authRouter from './router/auth.js'
import { corsMiddleware } from './middlewares/cors.js'

const app = express() // instance de express (createServer)

//Middleware
app.disable('x-powered-by')
app.use(json()) //Middleware de express para capturar el body de la petición
app.use(corsMiddleware())

const PORT = process.env.PORT || 3000

//Rutas
app.use('/auth', authRouter)
app.use('/users', userRouter)
app.get('/saludo/:nombre', (req, res) => {

    const { nombre } = req.params

    res.json({
        "message": `Hola ${nombre}`
    })
})

// Middleware para manejo de rutas inexistentes
app.use((req, res) => {
    res.status(404).json({
        message: "URL no encontrada"
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})