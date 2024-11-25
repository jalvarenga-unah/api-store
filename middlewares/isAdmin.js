
const isAdmin = (req, res, next) => {
    try {

        if (req.rol !== 'admin') {

            //consultar en tiempo real la BBDD
            return res.status(403).json({
                message: 'No tiene permisos para acceder a esta ruta'
            })
        }

        next()
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Error en el servidor'
        })
    }
}

export default isAdmin