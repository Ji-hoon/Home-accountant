import styled from "styled-components";
import { COLORS, SIZES } from "../../global/constants";

export default function Empty({
  icon,
  message,
  className,
}: {
  icon: React.ReactElement;
  message: string;
  className?: string;
}) {
  return (
    <EmptyContainer className={className}>
      {icon}
      <p>{message}</p>
    </EmptyContainer>
  );
}

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${SIZES.XXS}px;
  justify-content: center;
  padding-top: ${SIZES.XXL * 2}px;

  & svg {
    width: ${SIZES.XXL * 2}px;
    height: ${SIZES.XXL * 2}px;
    color: ${COLORS.GRAY_02};
  }
  & p {
    font-size: ${SIZES.LG}px;
    font-weight: 600;
    color: ${COLORS.GRAY_06};
  }
`;
