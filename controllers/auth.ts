import { Request, Response } from "express";
import User from "../models/user";

export const loginUser = async ( req: Request, res: Response ) => {
    const { username, password } = req.body;

    try {
        const user:any = await User.findOne({ where: { username }});

        if (!user) {
            return res.status(400).json({
                msg: "User not found"
            });
        }

        if (!password) {
            return res.status(400).json({
                msg: "Password is incorrect"
            });
        }

        return res.json({
            user
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error", 
            error
        });
    }
}