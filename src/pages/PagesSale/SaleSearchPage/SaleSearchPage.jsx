///hooks
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

/////components
import { EveryProduct } from '../../../components/SaleProd/EveryProduct/EveryProduct';
import NavMenu from '../../../common/NavMenu/NavMenu';
import { SearchProdsSale } from '../../../components/SaleProd/SearchProdsSale/SearchProdsSale';

////style
import './style.scss';

const SaleSearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { invoice_guid } = location.state;

  const { listProdSearch } = useSelector((state) => state.requestSlice);

  const emptyDataProd = listProdSearch?.length === 0;

  const listProdSale = () => {
    navigate('/sale/sold_prod', { state: { invoice_guid } });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <NavMenu>
        <SearchProdsSale />
      </NavMenu>
      <div className="containerSearch">
        <div className="containerSearch__inner">
          <button onClick={listProdSale} className="arrowSearch">
            <p className="textBtn">Список выбранных товаров</p>
            <div className="arrowInner"></div>
          </button>
          {emptyDataProd ? (
            <p className="noneData">Список пустой</p>
          ) : (
            <div className="blockSelectProd">
              {listProdSearch?.map((item, index) => (
                <EveryProduct
                  key={item?.guid}
                  obj={item}
                  index={index}
                  invoice_guid={invoice_guid}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SaleSearchPage;
