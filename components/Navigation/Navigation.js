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
                height="55"
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
                height="55"
              />
            </a>
          </Link>
        </NavItem>
        <NavItem>
          <Icon icon="pixelarticons:heart" color="#877bf4" height="55" />
        </NavItem>
        <NavItem>
          <Link href="/">
            <a>
              <Icon
                icon="ant-design:home-outlined"
                color="#877bf4"
                height="55"
              />
            </a>
          </Link>
        </NavItem>
      </NavList>
    </NavWrapper>
  );
}

const NavWrapper = styled.nav`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 0.5rem;
  background-color: var(--window-background-color);
  border: 2px solid var(--window-border-color);
  border-width: 2px 0 0 0;
`;

const NavList = styled.ul`
  display: flex;
  justify-content: space-around;
`;

const NavItem = styled.ul`
  list-style: none;
  padding: 0 1rem;
`;
