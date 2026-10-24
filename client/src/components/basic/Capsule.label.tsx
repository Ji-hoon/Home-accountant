import { memo } from "react";
import {
  FiBriefcase,
  FiCoffee,
  FiFilm,
  FiGift,
  FiInstagram,
  FiMusic,
  FiShoppingBag,
  FiNavigation,
} from "react-icons/fi";

function Capsule_Label({ id }: { id: string }) {
  console.log(id);
  return (
    <span className="category" id={id}>
      {(id.includes("식비") ||
        id.includes("외식") ||
        id.includes("디저트")) && <FiCoffee />}
      {(id.includes("문화") || id.includes("취미")) && <FiInstagram />}
      {(id.includes("OTT") || id.includes("영화")) && <FiFilm />}
      {(id.includes("선물") || id.includes("생일")) && <FiGift />}
      {(id.includes("공연") || id.includes("뮤지컬")) && <FiMusic />}
      {(id.includes("출장") || id.includes("회사")) && <FiBriefcase />}
      {(id.includes("쇼핑") || id.includes("장")) && <FiShoppingBag />}
      {(id.includes("교통") || id.includes("비행")) && <FiNavigation />}
      {id}
    </span>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default memo(Capsule_Label);
