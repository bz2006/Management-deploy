import express from "express";
import { DeleteAnalytics, GetAnalytics, UpdateAnalytics, UpdateinitInvoice, UpdateinvchAnalytics } from "../controllers/analyticsController.js";


const router = express.Router();

router.post("/update-analytics",UpdateAnalytics)

router.post("/update-analytics-inv",UpdateinvchAnalytics)

router.post("/update-analytics-invinit",UpdateinitInvoice)

router.get("/get-analytics",GetAnalytics)

router.post("/delete-analytics",DeleteAnalytics)



export default router;

//app.use("/api/v1/analytics",AnalyticsRoutes)