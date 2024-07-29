/////// hooks
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

/////// style
import "./style.scss";

/////// fns
import { getBonusCard } from "../../../store/reducers/requestSlice";

/////// components
import { Html5Qrcode } from "html5-qrcode";

//////// components
import NavMenu from "../../../common/NavMenu/NavMenu";

const ScannerAddBonusPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { invoice_guid } = location.state;

  const [start, setStart] = useState(true);

  const errorText = "Произошла ошибка, попробуйте перезагрузить сайт";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    setStart(true);
    const config = { fps: 10, qrbox: { width: 220, height: 200 } };
    const html5QrCode = new Html5Qrcode("qrCodeContainer");

    const qrScanerStop = () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode
          .stop()
          .then(() => console.log("Scanner stopped"))
          .catch((err) => console.log(err, errorText));
      }
    };

    const qrScanerSucces = (decodedText) => {
      setStart(false);
      ////// получаю данные бонусной карты
      const obj = { navigate, card_bonus: decodedText, invoice_guid };
      dispatch(getBonusCard(obj));
      navigator.vibrate(200); // Вибрация при успешном сканировании
    };

    if (start) {
      html5QrCode
        .start({ facingMode: "environment" }, config, qrScanerSucces)
        .catch((err) => console.log(err, errorText));
    } else {
      qrScanerStop();
    }

    return () => qrScanerStop();
  }, [start]);

  return (
    <>
      <NavMenu navText={"Сканер"} />
      <div className="scanner">
        <div id="qrCodeContainer"></div>
      </div>
    </>
  );
};

export default ScannerAddBonusPage;
