import { NavLink } from "react-router-dom";
import Navigation_ListType from "../../../components/basic/Navigation.listType";
import Button_Boxtype from "../../../components/basic/Button.boxType";
import { LABELS, PATH, URLS } from "../../../global/constants";

export default function Expenses_SubPage() {
  return (
    <>
      <div>
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
      <div>
        <h1>{location.pathname}</h1>
      </div>
      <div>
        <img src={URLS.AD_MOCK_IMAGE} />
      </div>
    </>
  );
}
