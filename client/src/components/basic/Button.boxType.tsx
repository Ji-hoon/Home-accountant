import styled from "styled-components";

export default function Button_Boxtype({
  children,
}: {
  children: React.ReactElement | string;
}) {
  return <BoxtypeButton>{children}</BoxtypeButton>;
}

// eslint-disable-next-line react-refresh/only-export-components
const BoxtypeButton = styled.button`
  border: none;
  border-radius: 5px;
  outline: none;
  padding: 16px 20px;
  font-size: 16px;
  font-weight: 700;
  background-color: #f5f5f5;
  cursor: pointer;
`;
