////// hooks
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

////// pages
import LoginPage from '../pages/LoginPage/LoginPage';
import Layouts from '../Layouts/Layouts';
import AllCategPage from '../pages/AllCategPage/AllCategPage';
import LeftoversPage from '../pages/LeftoversPage/LeftoversScreen';
import PagesSale from '../pages/PagesSale/PagesSale';
import PagesReturn from '../pages/PagesReturn/PagesReturn';

////// components
import Preloader from '../common/Preloader/Preloader';
import PagesCards from '../pages/PagesCards/PagesCards';
// import Alerts from "../components/Alerts/Alerts";
// import MoreInfo from "../components/MoreInfo/MoreInfo";

const MainRoutes = () => {
  const { data } = useSelector((state) => state.saveDataSlice);

  return (
    <>
      <Routes>
        {!data?.seller_guid ? (
          <Route path="/" element={<LoginPage />} />
        ) : (
          <Route element={<Layouts />}>
            <Route path="/" element={<AllCategPage />} />
            <Route path="/leftovers" element={<LeftoversPage />} />
            <Route path="/sale/*" element={<PagesSale />} />
            <Route path="/return/*" element={<PagesReturn />} />
            <Route path="/card/*" element={<PagesCards />} />
          </Route>
        )}
      </Routes>
      <Preloader />
    </>
  );
};

export default MainRoutes;
