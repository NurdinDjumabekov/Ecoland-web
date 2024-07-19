///hooks
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

////components
import { getEveryProd } from "../../../store/reducers/requestSlice.js";
import { addProductInvoiceTT } from "../../../store/reducers/requestSlice.js";

////style
import "./style.scss";
import Krest from "../../../common/Krest/Krest.jsx";
import NavMenu from "../../../common/NavMenu/NavMenu.jsx";

const EverySaleProdPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { obj } = location.state;

  const refInput = useRef(null);

  const [sum, setSum] = useState("");

  const { data } = useSelector((state) => state.saveDataSlice);
  const { everyProdSale } = useSelector((state) => state.requestSlice);

  const onChange = (e) => {
    const text = e.target.value;
    if (/^\d*\.?\d*$/.test(text)) {
      // Проверяем, не является ли точка или запятая первым символом
      if (text === "." || text?.indexOf(".") === 0) {
        return;
      }
      setSum(text);
    }
  };

  useEffect(() => {
    if (!!obj?.guid) {
      setTimeout(() => {
        refInput?.current?.focus();
      }, 400);
    }

    const { guid, invoice_guid } = obj;
    const { seller_guid } = data;

    dispatch(getEveryProd({ guid, invoice_guid, seller_guid, navigate }));
    /////// получаю каждый продукт для продажи
  }, []);

  const check_unit = everyProdSale?.unit_codeid == 1;
  const sale_price_discount = everyProdSale?.sale_price_discount;

  const check_discount = sale_price_discount != 0 || !!sale_price_discount;

  const typeProd = `Введите ${check_unit ? "количество" : "вес"}`;

  const addInInvoice = () => {
    if (sum == "" || sum == 0) {
      alert(typeProd);
    } else {
      const { price, sale_price, count_type } = everyProdSale;

      const sendData = { guid: obj?.guid, count: sum, sale_price_discount };
      const invoice_guid = { invoice_guid: obj?.invoice_guid };

      const data = { ...sendData, ...invoice_guid, price, sale_price };
      dispatch(addProductInvoiceTT({ data, navigate, count_type }));
      ///// продаю товар
    }
  };

  const onClose = () => navigate(-1);

  const typeVes = {
    1: `Введите ${check_unit ? "итоговое количество" : "итоговый вес"} товара`,
    2: "Введите итоговую сумму товара",
  };

  return (
    <>
      <NavMenu navText={"Назад"} />
      <div className="parenteveryProd">
        <p className="title">{everyProdSale?.product_name}</p>
        <Krest onClick={onClose} />
        <div className="addDataBlock">
          <div className="inputBlock">
            <p className="inputTitle">
              {check_discount ? "Скидочная цена " : "Цена продажи "}
              {everyProdSale?.unit && `за ${everyProdSale?.unit}`}
            </p>
            <div className="inputPrice">
              {check_discount ? (
                <>
                  <p className="priceNone">{everyProdSale?.sale_price} сом</p>
                  <p className="priceDiscount">
                    {sale_price_discount || 0} сом
                  </p>
                </>
              ) : (
                <p className="price">{everyProdSale?.sale_price} сом</p>
              )}
            </div>
          </div>
          <div className="inputBlock">
            <p className="inputTitle">
              {typeVes?.[+everyProdSale?.count_type]}
            </p>
            <input
              className="input"
              ref={refInput}
              value={sum}
              onChange={onChange}
              maxLength={8}
            />
          </div>
        </div>
        <button className="btnAdd" onClick={addInInvoice}>
          Продать товар
        </button>
      </div>
    </>
  );
};

export default EverySaleProdPage;
