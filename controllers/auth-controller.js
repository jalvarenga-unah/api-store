import connection from "../db/connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import 'dotenv/config';
export class AuthController {

    static authuser(req, res) {


        const { user, password } = req.body

        //TODO: realizar las evaluaciones pertinentes
        if (!user || !password) {
            return res.status(400).json({
                error: true,
                message: "Usuario y contraseña son requeridos!"
            })
        }

        const query = `SELECT username, password_hash,full_name, role, must_change_password, status 
                        FROM users WHERE username = ? `

        try {

            connection.query(query, [user], (error, results) => {

                // problemas con el seridor o la escturcutra de la consulta
                if (error) {
                    return res.status(400).json({
                        error: true,
                        message: "Ocurrió un error al obtener los dato: " + error
                    })
                }

                // si no hay resultados
                if (results && results.length === 0) {
                    return res.status(404).json({
                        error: true,
                        message: "Usuario no encontrado"
                    })
                }

                // results, es un array con los resultados de la consulta

                const { password_hash } = results[0] // extraigo el password_hash del primer elemento del array

                bcrypt.compare(password, password_hash, function (error, result) {

                    // result: devuelve true si las contraseñas coinciden, de lo contrario false
                    if (!result) {
                        return res.status(400).json({
                            error: true,
                            message: "Ocurrió un error al comparar las contraseñas"

                        })
                    }

                    const data = results[0]

                    delete data['password_hash'] // -> {username, password_hash, full_name, role, must_change_password, status}

                    const token = jwt.sign({ ...data }, process.env.SECRET_KEY, { expiresIn: '1h' })
                    data.token = token

                    return res.status(200).json({
                        error: false,
                        message: "Bienvenido",
                        data: data
                    })

                });
            })

        } catch (error) {
            return res.status(400).json({
                error: true,
                message: "Ocurrió un error al obtener los dato"
            })
        }


    }

}