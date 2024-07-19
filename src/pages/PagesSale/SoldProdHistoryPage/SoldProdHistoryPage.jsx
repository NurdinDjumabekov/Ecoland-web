//// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

//// redux
import { getListSoldProd } from "../../../store/reducers/requestSlice";
import { changeInfoKassaSale } from "../../../store/reducers/requestSlice";

//// helpers
import { formatCount, sumSoputkaProds } from "../../../helpers/amounts";

/////components
import NavMenu from "../../../common/NavMenu/NavMenu";
import ResultCounts from "../../../common/ResultCounts/ResultCounts";

//// style
import "./style.scss";

const SoldProdHistoryPage = () => {
  //// история каждой накладной продажи, история продаж
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { guidInvoice } = location.state;

  const { listSoldProd } = useSelector((state) => state.requestSlice);

  const getData = () => dispatch(getListSoldProd(guidInvoice));

  useEffect(() => {
    getData();
  }, [guidInvoice]);

  const status = listSoldProd?.status == 0; //// 0 - не подтвреждён, 1 - подтверждён

  const confirmSale = () => {
    ///// перехожу на страницу добавления товара в накладную продажи
    navigate("/sale/sold_prod", { state: { invoice_guid: guidInvoice } }); /// check
  };

  const addTovar = () => {
    ///// перехожу на страницу подтверждения продажи
    navigate("/sale/kassa", { state: { invoice_guid: guidInvoice } });
    dispatch(changeInfoKassaSale({ guid: guidInvoice, codeid: "" }));
    //// заренее подставляю guid накладной куда надо добавить товары
  };

  return (
    <>
      <NavMenu navText={listSoldProd?.list?.[0]?.date} />
      <div className="containerHistorySold">
        <div className="historyParent">
          {listSoldProd?.list?.map((item, index) => (
            <div className="everyInner">
              <div className="mainData">
                <div className="mainDataInner">
                  <p className="titleNum">{index + 1}</p>
                  <p className="sum">
                    {item?.sale_price} сом х {item?.count} {item?.unit} ={" "}
                    {formatCount(item?.total_soputka)} сом
                  </p>
                </div>
              </div>
              <p className="title">{item?.product_name}</p>
            </div>
          ))}
        </div>

        <div className="actionBlock">
          <ResultCounts list={listSoldProd?.list} />
          {!!listSoldProd?.user_bonuse && (
            <p className="discount">
              Оплачено бонусами: {listSoldProd?.user_bonuse} сом
            </p>
          )}

          <p className="totalItemSumm">
            Сумма продажи: {sumSoputkaProds(listSoldProd?.list)} сом
          </p>

          {status && (
            <div className="actionBlockInner">
              <button className="addCard" onClick={confirmSale}>
                Подвердить продажу
              </button>
              <button className="endSaleBtn" onClick={addTovar}>
                Добавить товар
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SoldProdHistoryPage;
