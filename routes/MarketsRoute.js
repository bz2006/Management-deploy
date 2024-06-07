import express from "express";
import { CreateMarkets, GetMarketbyid, GetallMarkets, UpdateMarket, deleteMarket } from "../controllers/MarketsController.js";

const router = express.Router();




router.post("/new-market",CreateMarkets);

router.get("/get-markets",GetallMarkets)

router.get("/get-market/:id",GetMarketbyid)

router.post("/update-market/:id",UpdateMarket)

router.delete("/delete-market/:id",deleteMarket)


export default router;