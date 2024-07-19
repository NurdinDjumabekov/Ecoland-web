/////// hooks
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

//////// fns
import { saleDiscountFN } from "../../../store/reducers/stateSlice";

/////// style
import "./style.scss";

const AddBonusPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { obj } = location.state;

  const [bonuse, setBonuse] = useState("");

  const refInput = useRef(null);

  const sendData = () => {
    if (+obj?.bonuse < +bonuse) {
      alert("Введённая вами сумма больше доступной вам суммы!");
    } else if (bonuse == "") {
      const { invoice_guid, user_guid, fio } = obj;
      dispatch(saleDiscountFN({ bonuse: 0, user_guid, fio })); ///// state для бонусов
      navigate("/sale/sold_prod", { state: { invoice_guid } });
    } else {
      const { invoice_guid, user_guid, fio } = obj;
      dispatch(saleDiscountFN({ bonuse, user_guid, fio })); ///// state для бонусов
      navigate("/sale/sold_prod", { state: { invoice_guid } });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      refInput?.current?.focus();
    }, 200);
  }, []);

  return (
    <div className="addCard">
      <div className="inputBlock">
        <p className="inputTitle">ФИО клиента</p>
        <input className="inputFio" value={obj?.fio} editable={false} />
      </div>
      <div className="inputBlock">
        <p className="inputTitle">Номер карты</p>
        <div className="numQrCode">
          <input
            className="inputFioQR"
            value={obj?.number?.toString()}
            editable={false}
          />
        </div>
      </div>
      <div className="inputBlock">
        <p className="inputTitle blue">Доступная сумма бонусов</p>
        <div className="numQrCode">
          <input
            className="inputFioQR blue"
            value={obj?.bonuse?.toString()}
            editable={false}
          />
        </div>
      </div>
      <div className="inputBlock">
        <p className="inputTitle green">Количество используемых бонусов</p>
        <div className="numQrCode">
          <input
            className="inputFioQR green"
            ref={refInput}
            value={bonuse}
            onChange={(e) => setBonuse(e.target.value)}
            maxLength={9}
          />
        </div>
      </div>
      <button className="addCardBtn" onClick={sendData}>
        Перейти к продаже
      </button>
    </div>
  );
};

export default AddBonusPage;
