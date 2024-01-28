import styled from "styled-components";
import { FiCheck } from "react-icons/fi";
import { COLORS, SIZES } from "../../global/constants";
import { selectedExpenseIdAtom } from "../../atoms/globalAtoms";
import { useRecoilState } from "recoil";

export default function Input_Checkbox({
  $id,
  $default,
  onClick,
}: {
  $id?: string;
  $default?: boolean;
  onClick?: () => void;
}) {
  const [selectedExpenseId, setSelectedExpenseId] = useRecoilState(
    selectedExpenseIdAtom,
  );

  let isSelected = $default === undefined ? false : $default;
  if ($id) {
    const matchedId = selectedExpenseId.find((id) => id === $id);
    if (matchedId) isSelected = true;
  }
  //console.log($id, isSelected);

  const handleClick = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    if ($id && !isSelected) {
      const newSelectedId = [...selectedExpenseId, $id];
      setSelectedExpenseId(newSelectedId);
    }

    if ($id && isSelected) {
      const newSelectedId = [...selectedExpenseId];
      const filteredSelectedId = newSelectedId.filter((id) => id !== $id);
      setSelectedExpenseId(filteredSelectedId);
    }
    //setIsSelected(!isSelected);
  };
  // console.log($id, selectedExpenseId);

  return (
    <Checkbox
      onClick={(event: React.SyntheticEvent) =>
        onClick ? onClick() : handleClick(event)
      }
      $selected={isSelected}
    >
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
      : `1px solid ${COLORS.GRAY_06_OVERAY}`};
  margin-top: 2px;
  margin-right: 4px;
  cursor: pointer;
  color: ${COLORS.BASIC_WHITE};
  padding: 1px 1px;

  -webkit-transition: all 150ms ease-out;
  transition: all 150ms ease-out;

  background-color: ${(props) =>
    props.$selected ? COLORS.BRAND_DEEP : COLORS.BASIC_WHITE};
  box-shadow: ${(props) =>
    props.$selected
      ? `0 1px 3px 0 transparent`
      : `0 1px 3px 0 ${COLORS.GRAY_05_OVERAY}`};

  &:before {
    content: "";
    position: absolute;
    width: ${SIZES.XXL}px;
    height: ${SIZES.XXL}px;
    margin: -10px;
  }
  &:hover {
    filter: ${(props) =>
      props.$selected ? "brightness(0.95)" : "brightness(1)"};
    border-color: ${(props) =>
      props.$selected ? COLORS.GRAY_05_OVERAY : COLORS.GRAY_08_OVERAY};
  }
`;
