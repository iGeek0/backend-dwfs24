const { response, request } = require('express');
const UserModel = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userGet = async (req = request, res = response) => {
    const users = await UserModel.find();
    res.status(200).json({
        message: "Datos cargados correctamente",
        data: users
    });
}

const userPost = async (req, res) => {
    try {
        let body = req.body;
        console.log(body);
        const salt = await bcryptjs.genSalt(10)
        body.password = await bcryptjs.hash(body.password, salt)
        let user = new UserModel(body);
        await user.save();
        res.status(201).json({
            message: "Datos insertados correctamente",
            data: user
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Error al insertar datos",
            data: null
        });
    }
}
const login = async (req, res) => {
    // obtenemos el email y password de la petición
    const { email, password } = req.body
    try {
        // buscamos al usuario
        let foundUser = await UserModel.findOne({ email })
        // si no se encuentra al usuario, devolvemos un error
        if (!foundUser) {
            return res.status(400).json({ msg: "Username does not exist" })
        }
        // si lo encuentra, evaluamos si la contraseña es correcta
        const passCorrecto = await bcryptjs.compare(password, foundUser.password)
        // si la contraseña es incorrecta, lo reportamos 
        // debemos tener cuidado de no entregar más info de la estrictamente necesaria
        if (!passCorrecto) {
            return await res.status(400).
                json({ msg: "The username or password does not correspond" })
        }
        // si todo es correcto, generamos un json web token
        // 1. el 'payload' será un objeto que contendrá el id del usuario
        const payload = { user: { id: foundUser._id } }
        // 2. firma del jwt
        jwt.sign(
            payload,
            // usamos la palabra secreta para descifrar la firma electrónica del token
            process.env.SECRET,
            {
                expiresIn: 3600000 // expiración del token en 1 hora
            },
            (error, token) => {
                if (error) throw error;
                //si todo va bien, retorna el token
                res.json({ token })
            })
    } catch (error) {
        res.json({
            msg: "Se encontró un error al intentar iniciar sesión",
            error
        })
    }
}

const userPut = async (req, res) => {
    // query = id=123456 - es cuando es opcional...
    // params = /:id -  es cuando es obligatorio
    const { id } = req.query;
    const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
        message: "Datos actualizado correctamente",
        data: updatedUser
    });
}

const userDelete = async (req, res) => {
    const { id } = req.query;
    await UserModel.findByIdAndDelete(id);
    res.status(200).json({
        message: "Usuario borrado con exito",
        data: null
    });
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,
    login
}