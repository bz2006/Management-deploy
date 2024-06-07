import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const signupcontroller = async (req, res) => {
    try {
        const { username, password, email } = req.body


        if (!email) {
            return res.send({ message: "email Required" })
        }
        if (!password) {
            return res.send({ message: "password Required" })
        }

        //extsting

        const exuser = await userModel.findOne({ email })

        //true
        if (exuser) {
            return res.status(200).send({
                success: false,
                message: "aldready registered please login",
            })
        }
        //registering
        const hashedpass = await hashPassword(password)
        const user = await new userModel({ username, email, password: hashedpass,}).save()
        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user,
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Errro in Registeration",
            error,
        });
    }
};

//LOGIN
export const logincontroller = async (req, res) => {
    try {
        const { email, password } = req.body
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Email is not registerd",
            })
        }
        //cheack user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(200).send({
                success: false,
                message: "Email is not found, Please Signup",
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            })
        }

        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success: true,
            message: "login successfully",

            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,

            }, token,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
}

//test

export const test = async (req, res) => {
    res.send("protected maiddlewares")
}