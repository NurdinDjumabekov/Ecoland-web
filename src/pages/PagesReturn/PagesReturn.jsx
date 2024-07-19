import React from "react";
import { Route, Routes } from "react-router-dom";
import MainReturnsPage from "./MainReturnsPage/MainReturnsPage";
import DetailedInvoiceReturnPage from "./DetailedInvoiceReturnPage/DetailedInvoiceReturnPage";

const PagesReturn = () => {
  return (
    <Routes>
      <Route path="/" element={<PagesReturn />} />
      <Route path="/main" element={<MainReturnsPage />} />
      <Route path="/every" element={<DetailedInvoiceReturnPage />} />
    </Routes>
  );
};

export default PagesReturn;
