////hooks
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

///components
import ResultCounts from "../../../common/ResultCounts/ResultCounts";
import TablesReturn from "../../../components/Tables/TablesReturn/TablesReturn";
import ConfirmationModal from "../../../common/ConfirmationModal/ConfirmationModal";

///states
import { getMyEveryInvoiceReturn } from "../../../store/reducers/requestSlice";
import { acceptInvoiceReturn } from "../../../store/reducers/requestSlice";

////helpers
import { formatCount, sumSaleProds } from "../../../helpers/amounts";

////style
import "./style.scss";
import NavMenu from "../../../common/NavMenu/NavMenu";

const DetailedInvoiceReturnPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { guidInvoice } = location.state; ///// guid каждой накладной с проданными товарами

  const [acceptOk, setAcceptOk] = useState(false); //// для модалки приняти накладной
  const clickOkay = () => setAcceptOk(true);

  const { everyInvoiceReturn } = useSelector((state) => state.requestSlice);
  const { data } = useSelector((state) => state.saveDataSlice);

  const acceptInvoiceFN = () => {
    ///// для принятия накладной торговой точкой
    const obj = { seller_guid: data?.seller_guid };

    const sendData = { ...obj, listReturn: everyInvoiceReturn, navigate };
    dispatch(acceptInvoiceReturn(sendData));
    setAcceptOk(false);
  };

  useEffect(() => {
    dispatch(getMyEveryInvoiceReturn(guidInvoice));
  }, [guidInvoice]);

  return (
    <>
      <NavMenu navText={everyInvoiceReturn?.[0]?.date} />

      <div className="mainReturn">
        <div className="containerReturn">
          <TablesReturn list={everyInvoiceReturn} />
          <div className="total">
            <ResultCounts list={everyInvoiceReturn} />
            <p className="totalItemCount">
              Сумма: {formatCount(sumSaleProds(everyInvoiceReturn))} сом
            </p>
            <button className="sendReturnProd" onClick={clickOkay}>
              Оформить возврат товара
            </button>
          </div>
        </div>
      </div>

      <ConfirmationModal
        visible={acceptOk}
        message="Оформить возврат ?"
        onYes={acceptInvoiceFN}
        onNo={() => setAcceptOk(false)}
        onClose={() => setAcceptOk(false)}
      />
    </>
  );
};

export default DetailedInvoiceReturnPage;
