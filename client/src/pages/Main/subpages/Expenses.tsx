import { NavLink } from "react-router-dom";
import Navigation_ListType from "../../../components/basic/Navigation.listType";
import Button_Boxtype from "../../../components/basic/Button.boxType";
import { LABELS, PATH, URLS } from "../../../global/constants";
import ListHeader from "../../../components/compound/ListHeader";

export default function Expenses_SubPage() {
  return (
    <>
      <div className="aside-navigation-container">
        <Navigation_ListType>
          <>
            <NavLink to={PATH.MAIN_EXPENSES_FILTER_BY_MONTH}>
              <Button_Boxtype>
                {LABELS.NAVIGATION_MENU_EXPENSES_BY_MONTH}
              </Button_Boxtype>
            </NavLink>
            <NavLink to={PATH.MAIN_EXPENSES_FILTER_BY_MEMBER}>
              <Button_Boxtype>
                {LABELS.NAVIGATION_MENU_EXPENSES_BY_MEMBER}
              </Button_Boxtype>
            </NavLink>
          </>
        </Navigation_ListType>
      </div>
      <div className="list-container">
        <ListHeader $title="2024년 1월" $type="EXPENSES" $value="0원" />
        <h1>{location.pathname}</h1>
      </div>
      <div className="advertise-container">
        <img src={URLS.AD_MOCK_IMAGE} />
      </div>
    </>
  );
}
