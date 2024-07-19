///// hooks
import { useDispatch, useSelector } from "react-redux";

////// components
import Modals from "../../../common/Modals/Modals";
import Krest from "../../../common/Krest/Krest";

///// fns
import { changeEveryInvoiceReturn } from "../../../store/reducers/requestSlice";

////style
import "./style.scss";

const ReturnChangeCount = (props) => {
  ////// модалка для изменения кол-ва
  const { objTemporary, setObjTemporary, inputRef } = props;

  const dispatch = useDispatch();

  const { everyInvoiceReturn } = useSelector((state) => state.requestSlice);

  const onClose = () => setObjTemporary({});

  const changeCount = () => {
    const newCountProd =
      objTemporary?.returnProd === "" ? 0 : objTemporary?.returnProd;

    const products = everyInvoiceReturn?.map((i) => ({
      ...i,
      returnProd: i?.guid === objTemporary?.guid ? newCountProd : i?.returnProd,
    }));

    for (let product of products) {
      if (product.returnProd > product.count) {
        alert(
          `Ошибка! Количество возврата для товара "${product.product_name}" превышает проданное количество!`
        );
        return;
      }
    }

    dispatch(changeEveryInvoiceReturn(products));
    onClose();
  };

  const onChange = (e) => {
    const text = e.target.value;
    if (/^\d*\.?\d*$/.test(text)) {
      setObjTemporary({ ...objTemporary, returnProd: text });
    }
  };

  return (
    <Modals openModal={!!objTemporary?.product_guid} setOpenModal={onClose}>
      <div className="parentCounter">
        <div className="child">
          <p className="title">{objTemporary?.product_name} </p>
          <Krest onClick={onClose} />
          <div className="addDataBlock">
            <div className="inputBlock">
              <p className="inputTitle">
                Введите{" "}
                {objTemporary?.unit_codeid == 1
                  ? "кол-во товара"
                  : "вес товара"}{" "}
                {/* ({objTemporary?.unit}) */}
              </p>
              <input
                value={objTemporary?.returnProd}
                onChange={onChange}
                maxLength={8}
                ref={inputRef}
              />
            </div>
            <button className="btnAdd" onClick={changeCount}>
              Изменить
            </button>
          </div>
        </div>
      </div>
    </Modals>
  );
};

export default ReturnChangeCount;
