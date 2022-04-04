import styled from "styled-components";
import Link from "next/link";
import { Icon } from "@iconify/react";

export default function Navigation() {
  return (
    <NavWrapper>
      <NavList>
        <NavItem>
          <Link href="/send/">
            <a>
              <Icon
                icon="pixelarticons:chart-add"
                color="#877bf4"
                height="40"
              />
            </a>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="/reply/">
            <a>
              <Icon
                icon="pixelarticons:reply-all"
                color="#877bf4"
                height="40"
              />
            </a>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="/">
            <a>
              <Icon
                icon="ant-design:home-outlined"
                color="#877bf4"
                height="40"
              />
            </a>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="/inbox">
            <a>
              <Icon icon="bxs:inbox" color="#877bf4" height="40" />
            </a>
          </Link>
        </NavItem>
        <NavItem>
          <Icon icon="ant-design:smile-outlined" color="#877bf4" height="40" />
        </NavItem>
      </NavList>
    </NavWrapper>
  );
}

const NavWrapper = styled.nav`
  width: 100%;
  height: 77px;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 1rem;
  background-color: var(--window-background-color);
  /*border: 2px solid var(--window-border-color);
  border-width: 3px 0 0 0;*/
  box-shadow: 0px -5px 2px 1px rgba(78, 10, 71, 0.57);
`;

const NavList = styled.ul`
  display: flex;
  justify-content: space-around;
`;

const NavItem = styled.li`
  list-style: none;
  padding: 0 1.1rem;
`;
