import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerDashboard from "./components/CustomerDashboard";
import MonthlyBreakdown from "./components/MonthlyBreakdown";
import TransactionTable from "./components/TransactionTable";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerDashboard />} />
        <Route path="/customer/:id" element={<MonthlyBreakdown />} />
        <Route path="/customer/:id/:month" element={<TransactionTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 