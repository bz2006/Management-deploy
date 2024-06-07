import express from "express"
import dotenv from "dotenv"
import morgan from "morgan";
import connectdb from "./config/db.js";
import cors from "cors"
import bodyParser from 'body-parser';
import cron from 'node-cron';
import CatlogRoute from "./routes/CatlogRoute.js"
import MarketsRoute from "./routes/MarketsRoute.js"
import InvoiceRoutes from "./routes/InvoiceRoutes.js"
import UserRoutes from "./routes/usersRoute.js"
import AnalyticsRoutes from "./routes/AnalyticsRoutes.js"
import { sendEmail ,sendOTP} from "./middlewares/nodemailerMiddleware.js";
import { FetchMonthlyInvoices } from "./middlewares/MonthlyInvoice.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import authRoute from "./routes/authRoute.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

connectdb();
const app = express()

const corsOptions = {
  origin: ['https://vision-management-console.visionwoodenclocks.com', 'https://vision-web-management-console.visionwoodenclocks.com'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use("/api/v1/records/catlog", CatlogRoute)
app.use("/api/v1/records/markets", MarketsRoute)
app.use("/api/v1/invoices", InvoiceRoutes)
app.use("/api/v1/analytics", AnalyticsRoutes)
app.use("/vm-api/v1/users", UserRoutes)

app.use("/api/v1/auth",authRoute)

app.use(express.static(path.join(__dirname, "frontend/build")))
app.use(express.static(path.join(__dirname, 'frontend', 'public')));


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});


cron.schedule('0 1 1 * *', () => {
  sendEmail(); 
});


app.post('/send-email', sendEmail);
app.post('/send-verification', sendOTP);

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log('****Server Started on ' + process.env.DEV_MODE + " Mode PORT:" + PORT + "****")
})
