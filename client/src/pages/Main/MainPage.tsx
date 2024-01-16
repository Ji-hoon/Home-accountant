import { NavLink } from "react-router-dom";
import { PATH } from "../../global/constants";

export default function MainPage() {
  return (
    <>
      <h1>Hello, Home accountant!</h1>
      <NavLink to={PATH.LOGIN}>Login 페이지로</NavLink>
    </>
  );
}
