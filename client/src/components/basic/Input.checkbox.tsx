import styled from "styled-components";
import { FiCheck } from "react-icons/fi";
import { COLORS, SIZES } from "../../global/constants";
import { useState } from "react";
import { selectedExpenseIdAtom } from "../../atoms/globalAtoms";
import { useRecoilState } from "recoil";

export default function Input_Checkbox({ $id }: { $id?: string }) {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useRecoilState(
    selectedExpenseIdAtom,
  );

  const handleClick = () => {
    if ($id && !isSelected) {
      const newSelectedId = [...selectedExpenseId, $id];
      setSelectedExpenseId(newSelectedId);
    }

    if ($id && isSelected) {
      const newSelectedId = [...selectedExpenseId];
      const filteredSelectedId = newSelectedId.filter((id) => id !== $id);
      setSelectedExpenseId(filteredSelectedId);
    }
    setIsSelected(!isSelected);
  };
  //console.log($id, selectedExpenseId);

  return (
    <Checkbox onClick={() => handleClick()} $selected={isSelected}>
      {isSelected && <FiCheck strokeWidth={4} size={14} />}
    </Checkbox>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
const Checkbox = styled.div<{
  $selected: boolean;
}>`
  width: ${SIZES.MD}px;
  height: ${SIZES.MD}px;
  border-radius: ${SIZES.XXS / 3}px;
  border: ${(props) =>
    props.$selected
      ? `1px solid ${COLORS.BRAND_DEEP}`
      : `1px solid ${COLORS.GRAY_05}`};
  margin-top: 2px;
  margin-right: 4px;
  cursor: pointer;
  color: ${COLORS.BASIC_WHITE};
  padding: 1px 1px;
  background-color: ${(props) =>
    props.$selected ? COLORS.BRAND_DEEP : COLORS.BASIC_WHITE};

  &:before {
    content: "";
    position: absolute;
    width: ${SIZES.XXL}px;
    height: ${SIZES.XXL}px;
    margin: -10px;
  }
  &:hover {
    filter: brightness(0.95);
  }
`;
