import { NavLink } from "react-router-dom";
import Navigation_ListType from "../../../components/basic/Navigation.listType";
import Button_Boxtype from "../../../components/basic/Button.boxType";

import { LABELS, PATH, URLS } from "../../../global/constants";
import ListHeader from "../../../components/compound/ListHeader";
import ListItem_ExpenseType from "../../../components/compound/ListItem.expenseType";
import Button_Floatingtype from "../../../components/basic/Button.floatingType";

export default function Expenses_SubPage() {
  const mockList = [
    {
      businessName: "(주)배달의민족",
      amounts: 20000,
      date: "2024-01-16 17:50:00",
      category: "식비",
      owner: "만두",
    },
    {
      businessName: "(주)굿모닝마트 교대역점",
      amounts: 30000,
      date: "2024-01-16 17:50:00",
      category: "식비",
      owner: "만두",
    },
    {
      businessName: "(주)영풍문고코엑스점",
      amounts: 16500,
      date: "2024-01-16 17:50:00",
      category: "문화생활",
      owner: "만두",
    },
  ];

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
        <ListHeader $title="2024년 1월" $type="EXPENSES" $value="100000" />
        <Button_Floatingtype />
        <ul>
          {mockList &&
            mockList.length > 0 &&
            mockList.map((item, index) => (
              <ListItem_ExpenseType key={index} $item={item} />
            ))}
          {mockList &&
            mockList.length > 0 &&
            mockList.map((item, index) => (
              <ListItem_ExpenseType key={index} $item={item} />
            ))}
          {mockList &&
            mockList.length > 0 &&
            mockList.map((item, index) => (
              <ListItem_ExpenseType key={index} $item={item} />
            ))}
          {mockList &&
            mockList.length > 0 &&
            mockList.map((item, index) => (
              <ListItem_ExpenseType key={index} $item={item} />
            ))}
        </ul>
      </div>
      <div className="advertise-container">
        <img src={URLS.AD_MOCK_IMAGE} />
      </div>
    </>
  );
}
