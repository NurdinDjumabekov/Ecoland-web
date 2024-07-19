////// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

////// components
import { AllHistoryInvoice } from "../../../common/AllHistoryInvoice/AllHistoryInvoice";

////// fns
import { getMyReturnInvoice } from "../../../store/reducers/requestSlice";

////style
import "./style.scss";
import NavMenu from "../../../common/NavMenu/NavMenu";

const MainReturnsPage = () => {
  const dispatch = useDispatch();

  const { listMyInvoiceReturn } = useSelector((state) => state.requestSlice);

  const { data } = useSelector((state) => state.saveDataSlice);

  const getData = () => dispatch(getMyReturnInvoice(data?.seller_guid));

  useEffect(() => {
    getData();
  }, []);

  console.log(listMyInvoiceReturn, "listMyInvoiceReturn");

  return (
    <>
      <NavMenu navText={"Возврат товара"} />
      <div className="returnMain">
        {listMyInvoiceReturn?.map((item, index) => (
          <AllHistoryInvoice
            key={item.guid}
            item={item}
            index={index}
            keyLink={"/return/every"}
          />
        ))}
      </div>
    </>
  );
};
export default MainReturnsPage;
