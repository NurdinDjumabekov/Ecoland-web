/////// style
import "./style.scss";

/////// hooks
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

//////// components
import InputMask from "react-input-mask";

/////// helpers
import { checNumInput, checkNumUser } from "../../../helpers/Data";
import { transformNumber } from "../../../helpers/transformNumber";

/////// img
import camera from "../../../assets/images/camera.png";

////// fns
import { TieCardWithUser } from "../../../store/reducers/requestSlice";
import { dataCardFN } from "../../../store/reducers/stateSlice";
import NavMenu from "../../../common/NavMenu/NavMenu";
import { useLocation, useNavigate } from "react-router-dom";

const AddCardScreen = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { dataCard } = useSelector((state) => state.stateSlice);

  useEffect(() => {
    dispatch(dataCardFN({ fio: "", phone: "", card: "" }));
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;

    const sanitizedText = value?.replace(/[.,]/g, "");
    dispatch(dataCardFN({ ...dataCard, [name]: sanitizedText }));
  };

  const openCameraQrCard = () => navigate("ScannerCardScreen");

  const sendData = () => {
    if (dataCard.fio?.length < 5) {
      alert("Введите ФИО клиента");
    } else if (!checkNumUser.test(dataCard?.phone)) {
      alert("Введите корректный номер телефона клиента");
    } else if (dataCard.card?.length !== 9) {
      alert("Введите корректный номер карты");
    } else {
      const dataSend = {
        ...dataCard,
        phone: `0${transformNumber(dataCard?.phone)}`,
      };
      dispatch(TieCardWithUser({ dataSend, navigate }));
    }
  };

  return (
    <>
      <NavMenu navText={"Добавление карты"} />
      <div className="addCardInfo">
        <div className="inputBlock">
          <p className="inputTitle">Введите ФИО клиента</p>
          <input
            className="inputFio"
            value={dataCard?.fio?.toString()}
            onChange={onChange}
            name="fio"
            placeholder="Джумабеков Нурдин"
          />
        </div>
        <div className="inputBlock">
          <p className="inputTitle">Введите номер клиента</p>
          <InputMask
            className="inputFio"
            value={dataCard?.phone}
            onChange={onChange}
            name="phone"
            mask={"+999(999)-99-99-99"}
          />
        </div>
        <div className="inputBlock">
          <p className="inputTitle">Введите 9ти значный номер карты</p>
          <div className="numQrCode">
            <input
              className="inputFioQR"
              value={dataCard?.card}
              onChange={onChange}
              name="card"
              maxLength={9}
            />
            <button className="btnOpenQR" onClick={openCameraQrCard}>
              <img src={camera} alt="camera" className="btnImgQR" />
            </button>
          </div>
        </div>
        <button className="addCardBtn" onClick={sendData}>
          + Прикрепить карту
        </button>
      </div>
    </>
  );
};

export default AddCardScreen;
