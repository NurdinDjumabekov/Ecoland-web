/////// hooks
import React, { useRef, useState } from "react";

/////// components
// import RevisionChangeCount from "../../../components/CheckProd/RevisionChangeCount/RevisionChangeCount";

////style
import "./style.scss";
import ReturnChangeCount from "../../Return/ReturnChangeCount/ReturnChangeCount";

const TablesReturn = ({ list }) => {
  const [objTemporary, setObjTemporary] = useState({});

  const inputRef = useRef(null);

  const addTenporaryData = (data) => {
    setObjTemporary(data);
    setTimeout(() => {
      inputRef?.current?.focus();
    }, 1000);
  };

  return (
    <>
      <div className="listRevisionHeader">
        <div className="mainBlock more">
          <p className="name moreText">Товар</p>
          <p className="price moreText">Цена</p>
          <p className="count moreText">Продано</p>
          <p className="count moreText">Возврат</p>
        </div>
        <div className="listRevisionTable">
          {list?.map((item, index) => (
            <div className="mainBlock" key={item.guid}>
              <p className="name">
                {index + 1}. {item?.product_name}
              </p>
              <p className="price">{item?.sale_price}</p>
              <p className="count">{item?.count}</p>
              <button onClick={() => addTenporaryData(item)}>
                <p>{item?.returnProd}</p>
              </button>
            </div>
          ))}
        </div>
      </div>
      <ReturnChangeCount
        objTemporary={objTemporary}
        setObjTemporary={setObjTemporary}
        inputRef={inputRef}
      />
    </>
  );
};

export default TablesReturn;
