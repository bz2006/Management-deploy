import { Routes, Route } from "react-router-dom"
import './App.css';
import HomePage from './pages/Home';
import axios from "axios"
import GlobalStyle from './globalStyles';
import Records from "./pages/Records";
import General from "./pages/General";
import Invoice from "./pages/Invoice";
import GenerateInvoice from "./pages/Invoice-Generators/GenInvoice"
import Allinvoices from "./pages/Allinvoices";
import GenerateExistingInvoice from "./pages/Invoice-Generators/GenExistingInvoice";
import MultipleInvoices from "./pages/Invoice-Generators/MultipleInvoices";
import MonthlyInvoices from "./pages/Invoice-Generators/ViewMonthlyInvoices";
import MRPDetails from "./pages/MRP-Generator/MRPDetails";
import MRPGenerate from "./pages/MRP-Generator/MRP-Generate";
import Login from "./pages/Auth/login";
import { AuthProvider } from "./context/auth";
import UpdateInvoice from "./pages/UpdateInvoice";
import GenerateUpdatedInvoice from "./pages/Invoice-Generators/UpdatedInvoice";
import PageUnderwork from "./pages/maintainance";



axios.defaults.baseURL = "http://localhost:3001"
axios.defaults.withCredentials = true

function App() {

  let Access =false

  const authData = JSON.parse(localStorage.getItem("auth"));
  if (authData) {
    Access=authData["success"]
  }

  return (
    <>
      <AuthProvider>
        <GlobalStyle />
        <Routes>

          {authData === null && Access === false ? (<Route path="*" element={<Login />} />)
            :
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="/new-invoice" element={<Invoice />} />
              <Route path="/records" element={<Records />} />
              <Route path="/general-details" element={<General />} />
              <Route path="/generate-invoice" element={<GenerateInvoice />} />
              <Route path="/all-invoices" element={<Allinvoices />} />
              <Route path="/gen-existing-invoice" element={<GenerateExistingInvoice />} />
              <Route path="/multiple-invoice" element={<MultipleInvoices />} />
              <Route path="/view-monthly-invoices" element={<MonthlyInvoices />} />
              <Route path="/mrp-gen-details" element={<MRPDetails />} />
              <Route path="/generate-mrp" element={<MRPGenerate />} />
              <Route path="/update-invoice/:id" element={<UpdateInvoice />} />
              <Route path="/gen-updated-invoice" element={<GenerateUpdatedInvoice />} />
              <Route path="/web-management" element={<PageUnderwork />} />
            </>
          }



        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
