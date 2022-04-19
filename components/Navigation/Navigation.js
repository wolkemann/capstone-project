import styled from "styled-components";
import Link from "next/link";
import { Icon } from "@iconify/react";

export default function Navigation({ currentPage }) {
  return (
    <NavWrapper>
      <NavList>
        <Link href="/send/">
          <Navlink
            style={
              currentPage === "send" ? { backgroundColor: "#e6f6ff" } : null
            }
          >
            <NavItem>
              <Icon icon="fluent:code-text-edit-20-regular" height="40" />
            </NavItem>
          </Navlink>
        </Link>
        <Link href="/reply/">
          <Navlink
            style={
              currentPage === "reply" ? { backgroundColor: "#e6f6ff" } : null
            }
          >
            <NavItem>
              <Icon icon="pixelarticons:reply-all" height="40" />
            </NavItem>
          </Navlink>
        </Link>
        <Link href="/">
          <Navlink style={!currentPage ? { backgroundColor: "#e6f6ff" } : null}>
            <NavItem>
              <Icon icon="ant-design:home-outlined" height="40" />
            </NavItem>
          </Navlink>
        </Link>
        <Link href="/inbox">
          <Navlink
            style={
              currentPage === "inbox" ? { backgroundColor: "#e6f6ff" } : null
            }
          >
            <NavItem>
              <Icon icon="bxs:inbox" height="40" />
            </NavItem>
          </Navlink>
        </Link>
        <Link href="/stickers">
          <Navlink
            style={
              currentPage === "stickers" ? { backgroundColor: "#e6f6ff" } : null
            }
          >
            <NavItem>
              <Icon icon="ant-design:smile-outlined" height="40" />
            </NavItem>
          </Navlink>
        </Link>
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
  background-color: var(--window-background-color);
  box-shadow: 0px -5px 2px 1px rgba(78, 10, 71, 0.57);
`;

const NavList = styled.ul`
  display: flex;
  flex-shrink: 1;
  justify-content: center;
`;

const NavItem = styled.li`
  list-style: none;
  width: 100%;
  padding: 1rem;
`;

const Navlink = styled.a`
  text-align: center;
  width: 100%;

  cursor: pointer;
  &:hover {
    background-color: #92bad1;
  }
`;
