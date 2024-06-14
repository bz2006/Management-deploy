import './App.css';
import MonthlyInvoices from './ViewMonthlyInvoices';
import GlobalStyle from './globalStyles';
import { Routes, Route } from "react-router-dom"
import axios from 'axios';



axios.defaults.baseURL = "http://13.202.119.177"
axios.defaults.withCredentials = true

function App() {


  
  return (
    <>
    <GlobalStyle/>
    <Routes>
       <Route path="/view-monthly-invoices" element={<MonthlyInvoices/>} />
    </Routes>
    </>
  );
}

export default App;
