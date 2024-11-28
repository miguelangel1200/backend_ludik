import { Request, Response } from "express";
import User from "../models/user";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();

        res.json({
            message: "Usuarios",
            users: users
        })
    } catch (error: any) {
        res.status(404).json({
            error: error.message,
        })
    }
}

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);

        res.status(200).json({
            message: "User",
            user: user
        })
    } catch (error) {
        res.status(400).json({
            msg: `No existe un usuario con el id ${ id }`
        })
    }
}

export const postUser = async (req: Request, res: Response) => {
    const {
        username,
        email,
        password
    } = req.body;

    try {
        const existEmail = await User.findOne({ where: { email }});
        const existUsername = await User.findOne({ where: { username }});

        if (existEmail) {
            return res.status(400).json({
                msg: `El correo ya existe ${email}.`
            })
        }

        if (existUsername) {
            return res.status(400).json({
                msg: `El usuario ya existe ${username}.`
            })
        }

        await User.create({
            username: username,
            email: email,
            password: password,
            createdAt: new Date(),
            updateAt: new Date()
        });

        res.json(`Usuario ${username} con ${email} creado con éxito`);

    } catch (error:any) {
        res.status(400).json({
            msg: 'Error: ' + error.message
        })
    }
}

export const putUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({
                msg: `User not found with id ${id}`
            });
        }

        await user.update(body);

        res.json({
            msg: `User updated successfully`,
            user: user
        });

    } catch (error) {
        res.status(500).json({
            msg: `Error updating user`
        })
    }
}
