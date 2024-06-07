import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { signupcontroller, logincontroller, test } from "../controllers/authcontroller.js"



//projected routrs
export const requireSignup = async (req, res, next) => {
    try {
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET);
        req.user = decode
        next();
    } catch (error) {

    }
};
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id)
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "UnAuthorized Access",
            })
        } else {
            next();
        }
    } catch (error) {
        res.status(401).send({
            success: false,
            error,
            message: "Error in admin middelware",
        })
    }
}
