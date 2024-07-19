import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ScannerAddBonusPage from './ScannerAddBonusPage/ScannerAddBonusPage';
import AddBonusPage from './AddBonusPage/AddBonusPage';
import AddCardPage from './AddCardPage/AddCardPage';
import ScannerCardPage from './ScannerCardPage/ScannerCardPage';

const PagesCards = () => {
  return (
    <Routes>
      <Route path="/" element={<PagesCards />} />
      <Route path="/add" element={<AddCardPage />} />
      {/* добавление карты */}
      <Route path="/accept_reg" element={<ScannerCardPage />} />
      {/* сканирование карты для привязки клиента */}

      <Route path="/add_bonus" element={<ScannerAddBonusPage />} />
      <Route path="/add_bonus_sale" element={<AddBonusPage />} />
    </Routes>
  );
};

export default PagesCards;
//     const location = useLocation();
//     const navigate = useNavigate();

//     const { guidInvoice } = location.state;
//     const navigate = useNavigate();
///    <NavMenu navText={"Продажи"} />
