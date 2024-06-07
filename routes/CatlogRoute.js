import express from "express";
import { CreateProducts, UpdateProducts, deleteCatlog, getCatlogbyname, getallcatlogs } from "../controllers/catlogController.js";
// import { CreateProducts, UpdateProducts, deleteCatlog, getCatlogbyname, getallcatlogs } from "../controllers/catlogController";

const router = express.Router();




router.post("/:catlog",CreateProducts);

router.post("/update-catlog/:id",UpdateProducts);

router.get("/get-catlogs",getallcatlogs);

router.get("/get-catlog/:catlogname",getCatlogbyname);

router.delete("/delete-catlog/:id",deleteCatlog)


export default router;