import express from "express";
import { Forgotpass } from "../controllers/usersController.js";
import { isAdmin, requireSignup } from "../middlewares/authMiddleware.js";
import {
  getUserById,
  updateUsername,
  useraddress,
  UpdatePass
} from "../controllers/usersController.js";


const router = express.Router();






// User Routes ----------------------------------

router.get("/get-user/:id", getUserById);

router.post("/update-username/:id", updateUsername);

router.post("/update-pass/:id", UpdatePass);

router.post("/forgot-pass/:email", Forgotpass);

router.post(
  "/update-user/:id",
  requireSignup, useraddress

);





// //get single product Page
// router.get("/product-page/:id", getSingleProduct);

// // //delete product
// router.delete("/delete-product/:id", requireSignup,
//   isAdmin, deleteproduct);






export default router;