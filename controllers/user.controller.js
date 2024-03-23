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
    const { name, age, email, password } = req.body;
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    let user = new UserModel(
        {
            name: name,
            age: age,
            email: email,
            password: hashedPassword
        }
    );
    await user.save();
    res.send('Entro a users POST');
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

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        let foundUser = await UserModel.findOne({ email });

        if (!foundUser) {
            return res.status(400).json({ msg: "Este usuario no existe" });
        }

        const passCorrecto = await bcryptjs.compare(password, foundUser.password);

        if (!passCorrecto) {
            return res.status(400).
                json({ msg: "Usuario o password incorrecto" });
        }

        const payload = {
            user: {
                id: foundUser.id,
                name: foundUser.name,
                color: "#ff0000"
            }
        };

        jwt.sign(
            payload,
            process.env.SECRET,
            {
                expiresIn: 3600000 // 1 hora
            },
            (error, token) => {
                if (error) throw error;
                res.json({ token: token })
            })
    } catch (error) {
        res.json({
            msg: "we have an error",
            error
        })
    }
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,
    login
}