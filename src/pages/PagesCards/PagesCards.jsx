import React from "react";
import { Route, Routes } from "react-router-dom";
import ScannerAddBonusPage from "./ScannerAddBonusPage/ScannerAddBonusPage";
import AddBonusPage from "./AddBonusPage/AddBonusPage";
import AddCardScreen from "./AddCardPage/AddCardPage";

const PagesCards = () => {
  return (
    <Routes>
      <Route path="/" element={<PagesCards />} />
      <Route path="/add_bonus" element={<ScannerAddBonusPage />} />
      <Route path="/add" element={<AddCardScreen />} />
    </Routes>
  );
};

export default PagesCards;
//     const location = useLocation();
//     const navigate = useNavigate();

//     const { guidInvoice } = location.state;
//     const navigate = useNavigate();
///    <NavMenu navText={"Продажи"} />
