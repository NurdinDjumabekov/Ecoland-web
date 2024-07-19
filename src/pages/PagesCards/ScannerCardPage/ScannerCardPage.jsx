/////// hooks
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

/////// style
import './style.scss';

/////// components
import { Html5Qrcode } from 'html5-qrcode';
import NavMenu from '../../../common/NavMenu/NavMenu';

///// fns
import { dataCardFN } from '../../../store/reducers/stateSlice';

const ScannerCardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { dataCard } = useSelector((state) => state.stateSlice);

  const [start, setStart] = useState(true);

  const errorText = 'Произошла ошибка, попробуйте перезагрузить сайт';

  useEffect(() => {
    setStart(true);
    const config = { fps: 10, qrbox: { width: 200, height: 200 } };
    const html5QrCode = new Html5Qrcode('qrCodeContainer');

    const qrScanerStop = () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode
          .stop()
          .then(() => console.log('Scanner stopped'))
          .catch((err) => console.log(err, errorText));
      }
    };

    const qrScanerSucces = (decodedText) => {
      setStart(false);
      navigator.vibrate(200); // Вибрация при успешном сканировании
      ////// получаю данные бонусной карты
      dispatch(dataCardFN({ ...dataCard, card: decodedText }));
      navigate('/card/add');
    };

    if (start) {
      html5QrCode
        .start({ facingMode: 'environment' }, config, qrScanerSucces)
        .catch((err) => console.log(err, errorText));
    } else {
      qrScanerStop();
    }

    return () => qrScanerStop();
  }, [start]);

  return (
    <>
      <NavMenu navText={'Сканер'} />
      <div className="scanner">
        <div id="qrCodeContainer"></div>
      </div>
    </>
  );
};

export default ScannerCardPage;
