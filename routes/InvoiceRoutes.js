import express from "express";
import { AddtoGSTrecord, GetLatestInv, GetMonthlyInvoicces, GetallIvoices, Getinvoicebyid, UpdateGSTRecord, deleteInvoice } from "../controllers/InvoiceController.js";

const router = express.Router();

router.post("/add-invoice",AddtoGSTrecord)

router.post("/update-invoice/:id",UpdateGSTRecord)


router.get("/get-allinvoice",GetallIvoices)

router.get("/get-invoice/:id",Getinvoicebyid)

router.get("/get-monthly-invoices",GetMonthlyInvoicces)

router.get("/latest-inv",GetLatestInv)

router.delete("/delete-invoice/:id",deleteInvoice)

export default router;