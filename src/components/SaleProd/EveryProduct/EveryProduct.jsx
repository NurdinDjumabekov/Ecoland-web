////// hooks
import { useNavigate } from "react-router-dom";

///// style
import "./style.scss";

export const EveryProduct = (props) => {
  //// SalePointScreen - для продажи
  const { obj, index, invoice_guid } = props;

  const navigate = useNavigate();

  const addInTemporary = () => {
    navigate("/sale/every_prod", { state: { obj: { ...obj, invoice_guid } } });
  };

  return (
    <button className="blockEveryMain" onClick={addInTemporary}>
      <div className="blockEveryMain__inner">
        <div>
          <div className="mainContent">
            <p className="titleEvery">{index + 1}.</p>
            <p className="titleEvery width85"> {obj?.product_name}</p>
          </div>
        </div>
        <div className="arrow"></div>
      </div>
    </button>
  );
};
