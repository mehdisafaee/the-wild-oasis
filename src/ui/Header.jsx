import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyleHeader = styled.header`
  padding: 1.2rem 4.8rem;
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
`;

function Header() {
  return (
    <StyleHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyleHeader>
  );
}

export default Header;
