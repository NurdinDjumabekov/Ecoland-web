////// hooks
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

////// components
import { AllHistoryInvoice } from '../../../common/AllHistoryInvoice/AllHistoryInvoice';

////// fns
import { createInvoiceTT } from '../../../store/reducers/requestSlice';
import { getListSoldInvoice } from '../../../store/reducers/requestSlice';
import { clearSaleDiscountFN } from '../../../store/reducers/stateSlice';
import { saleDiscountFN } from '../../../store/reducers/stateSlice';

////// style
import './style.scss';

////// imgs
import card from '../../../assets/images/card.png';
import sale from '../../../assets/images/sale.png';
import { useNavigate } from 'react-router-dom';
import NavMenu from '../../../common/NavMenu/NavMenu';

const MainSalePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { listSoldInvoice } = useSelector((state) => state.requestSlice);
  const { data } = useSelector((state) => state.saveDataSlice);

  const getData = () => dispatch(getListSoldInvoice(data?.seller_guid));

  useEffect(() => {
    getData();
  }, []);

  const saleProd = () => {
    dispatch(createInvoiceTT({ seller_guid: data?.seller_guid, navigate }));
    //// СОЗДАНИ НАКЛАДНОЙ ДЛЯ ПРОДАЖИ
  };

  const addInfoCards = () => navigate('/card/add');
  //// перенаправляю на страницу добавления карты

  return (
    <>
      <NavMenu navText={'Продажи'} />
      <div className="listSoldsProd">
        <div className="saleActionBlock">
          <button className="saleBlock" onClick={saleProd}>
            <p className="cardTitle">Продажа товара</p>
            <img src={sale} alt="sale" className="saleBlockImg" />
          </button>
          <button className="cardsBlock" onClick={addInfoCards}>
            <p className="cardTitle">Привязать карту</p>
            <img src={card} alt="card" className="cardsBlockImg" />
          </button>
        </div>
        <div className="selectBlock">
          <p className="title">История продаж</p>
          {listSoldInvoice?.length === 0 ? (
            <p className="noneData">Продажи за смену отсутствуют</p>
          ) : (
            <>
              {listSoldInvoice?.map((item, index) => (
                <AllHistoryInvoice
                  key={item?.guid}
                  item={item}
                  index={index}
                  keyLink={'/sale/history'}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MainSalePage;
