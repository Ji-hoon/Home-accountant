import { NavLink } from "react-router-dom";
import { URLS } from "../../global/constants";

export default function Banner() {
  //TODO: 추후 여러 배너 중 랜덤하게 표시토록 기능 구현
  return (
    <NavLink to={URLS.AD_MOCK_URL} target="_blank">
      <img src={URLS.AD_MOCK_IMAGE} />
    </NavLink>
  );
}
