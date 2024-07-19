///// hooks
import { useEffect } from "react";

/////  components
import EveryCategory from "../../components/AllCategory/EveryCategory";
import NavMenu from "../../common/NavMenu/NavMenu";
import { LogOut } from "../../components/Header/LogOut/LogOut";
import UserInfo from "../../components/Header/UserInfo/UserInfo";

////// helpers
import { dataCategory } from "../../helpers/Data";

////// styles
import "./style.scss";

const AllCategPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <NavMenu>
        <UserInfo /> <LogOut />
      </NavMenu>

      <div className="allCateg">
        {dataCategory?.map((item) => (
          <EveryCategory obj={item} key={item?.codeid} />
        ))}
      </div>
    </>
  );
};

export default AllCategPage;
