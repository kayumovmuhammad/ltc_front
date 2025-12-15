import { BrowserRouter, Routes, Route } from "react-router-dom";
import TariffCalculator from "./pages/TariffCalculator";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Expenses from "./pages/Index";
import ComplaintWidget from "./components/ComplaintWidget";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryComplaints from "./pages/admin/CategoryComplaints";
import "./index.css";


function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 relative">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calculator" element={
            <main>
              <TariffCalculator />
            </main>
          } />
          <Route path="/expences" element={<Expenses />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="category/:categoryName" element={<CategoryComplaints />} />
          </Route>
        </Routes>
        <Footer />
        <ComplaintWidget />
      </div>
    </BrowserRouter >
  );
}

export default App;
