import React from "react";
import { Route, Routes } from "react-router-dom";
import MainSalePage from "./MainSalePage/MainSalePage";
import SoldProdHistoryPage from "./SoldProdHistoryPage/SoldProdHistoryPage";
import SalePointPage from "./SalePointPage/SalePointPage";
import EverySaleProdPage from "./EverySaleProdPage/EverySaleProdPage";
import SoldProductPage from "./SoldProductPage/SoldProductPage";
import SaleSearchPage from "./SaleSearchPage/SaleSearchPage";
import ScannerSalePage from "./ScannerSaleScreen/ScannerSaleScreen";

const PagesSale = () => {
  return (
    <Routes>
      <Route path="/" element={<PagesSale />} />
      <Route path="/main" element={<MainSalePage />} />
      <Route path="/history" element={<SoldProdHistoryPage />} />
      <Route path="/kassa" element={<SalePointPage />} />
      <Route path="/every_prod" element={<EverySaleProdPage />} />
      <Route path="/sold_prod" element={<SoldProductPage />} />
      <Route path="/search" element={<SaleSearchPage />} />
      <Route path="/scanner_sale" element={<ScannerSalePage />} />
    </Routes>
  );
};

export default PagesSale;
