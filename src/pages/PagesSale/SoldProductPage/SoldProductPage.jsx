////// hooks
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

/////// fns
import { getListSoldProd } from '../../../store/reducers/requestSlice';
import { endSaleProds } from '../../../store/reducers/requestSlice';
import { deleteSoldProd } from '../../../store/reducers/requestSlice';

////// components
import NavMenu from '../../../common/NavMenu/NavMenu';
import ConfirmationModal from '../../../common/ConfirmationModal/ConfirmationModal';
import Krest from '../../../common/Krest/Krest';

////// helpers
import { formatCount, sumSaleProds } from '../../../helpers/amounts';

////style
import './style.scss';

const SoldProductPage = () => {
  //// список проданных продуктов
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { invoice_guid } = location.state;

  const [modalItemGuid, setModalItemGuid] = useState(null); // Состояние для идентификатора элемента, для которого открывается модальное окно
  const [modal, setModal] = useState(false); // для подтверждения завершения продажи

  const { listSoldProd } = useSelector((state) => state.requestSlice);
  const { saleDiscount } = useSelector((state) => state.stateSlice);

  const getData = () => dispatch(getListSoldProd(invoice_guid));

  useEffect(() => {
    getData();
  }, [invoice_guid]);

  const del = (product_guid) => {
    dispatch(deleteSoldProd({ product_guid, getData }));
    setModalItemGuid(null);
  };

  const endSale = () => {
    ///// отправка накладной с продуктами (полная продажа)
    dispatch(endSaleProds({ ...saleDiscount, invoice_guid, navigate }));
    setModal(false);
  };

  const navCard = () => {
    navigate('/card/add_bonus', { state: { invoice_guid } });
  };

  const sumProds = formatCount(sumSaleProds(listSoldProd?.list));
  const bonus = formatCount(+saleDiscount?.bonuse);
  const result = +sumProds - +bonus;

  if (!listSoldProd?.list) {
    return (
      <>
        <NavMenu navText={'Список продаж'} />
        <p className="noneData">Список пустой</p>
      </>
    );
  }

  return (
    <>
      <NavMenu navText={'Список продаж'} />
      <div className="soldBlock">
        <div className="soldBlock">
          {listSoldProd?.list?.map((item, index) => (
            <div className="container" key={item?.guid}>
              <div className="parentBlock">
                <div className="mainData">
                  <p className="indexNums">{index + 1} </p>
                  <div>
                    <p className="titleDate">{item.date || '...'}</p>
                    <p className="totalPrice">
                      {item?.product_price} сом х {item?.count} {item?.unit} ={' '}
                      {formatCount(+item?.total)} сом
                    </p>
                  </div>
                </div>
                <Krest onClick={() => setModalItemGuid(item?.guid)} />
              </div>
              <div>
                <p className="title">{item?.product_name}</p>
              </div>
              <ConfirmationModal
                visible={modalItemGuid === item?.guid}
                message="Отменить продажу ?"
                onYes={() => del(item?.guid)}
                onNo={() => setModalItemGuid(null)}
                onClose={() => setModalItemGuid(null)}
              />
            </div>
          ))}
        </div>

        <div className="actionBlock">
          {saleDiscount?.fio && (
            <p className="resultFio">Клиент: {saleDiscount?.fio}</p>
          )}
          <p className="result">Сумма товара: {sumProds} сом</p>
          <p className="resultDiscount">Бонусы: {bonus || 0} сом</p>
          <p className="resultAll">Итого к оплате: {result || 0} сом</p>

          <div className="actionBlockInner">
            <button className="addCard" onClick={navCard}>
              Бонусная карта
            </button>

            <button className="endSaleBtn" onClick={() => setModal(true)}>
              Завершить продажу
            </button>
          </div>
        </div>
      </div>
      <ConfirmationModal
        visible={modal}
        message="Завершить продажу ?"
        onYes={() => endSale()}
        onNo={() => setModal(false)}
        onClose={() => setModal(false)}
      />
    </>
  );
};

export default SoldProductPage;
