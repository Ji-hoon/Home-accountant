import styled from "styled-components";

export default function Layout_HorizontalView({
  children,
}: {
  children: JSX.Element;
}) {
  return <HorizontalViewContainer>{children}</HorizontalViewContainer>;
}

// eslint-disable-next-line react-refresh/only-export-components
const HorizontalViewContainer = styled.section`
  display: flex;
`;
