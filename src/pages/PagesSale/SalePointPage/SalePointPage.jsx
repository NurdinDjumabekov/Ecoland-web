////// hooks
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

////// fns
import { clearListCategory } from '../../../store/reducers/requestSlice';
import { clearListProductTT } from '../../../store/reducers/requestSlice';
import { clearTemporaryData } from '../../../store/reducers/stateSlice';
import { changeActiveSelectCategory } from '../../../store/reducers/stateSlice';
import { changeActiveSelectWorkShop } from '../../../store/reducers/stateSlice';

/////// components
import EveryInvoiceSale from '../../../components/SaleProd/EveryInvoiceSale/EveryInvoiceSale';

/////// style
import './style.scss';

const SalePointPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { invoice_guid } = location.state;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dispatch(clearTemporaryData()); // очищаю активный продукт

    return () => {
      dispatch(clearListProductTT());
      dispatch(clearListCategory());
      ///// очищаю список категрий и продуктов
      dispatch(changeActiveSelectCategory(''));
      /// очищаю категории, для сортировки товаров по категориям
      dispatch(changeActiveSelectWorkShop(''));
      /// очищаю цеха, для сортировки товаров по категориям
    };
  }, []);

  const listProdSale = () => {
    navigate('/sale/sold_prod', { state: { invoice_guid } });
  };

  return (
    <>
      <div className="parentBlockKassa">
        <button onClick={listProdSale} className="parentBlockKassa__nav">
          <p className="textBtn">Список выбранных товаров</p>
          <div className="arrowInner"></div>
        </button>
        <EveryInvoiceSale invoice_guid={invoice_guid} />
      </div>
    </>
  );
};
export default SalePointPage;
