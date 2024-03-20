import { NavLink } from "react-router-dom";
import { PATH } from "../../global/constants";

export default function ErrorPage() {
  return (
    <>
      404 페이지
      <br />
      <NavLink to={PATH.ROOT}>홈페이지로</NavLink>
    </>
  );
}
