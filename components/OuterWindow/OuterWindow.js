import styled from "styled-components";

export default function WindowOut({ children }) {
  return <OuterWindow>{children}</OuterWindow>;
}

const OuterWindow = styled.div`
  display: flex;
  flex-flow: column wrap;
  gap: 3px;
  margin: 0.5rem 0;
  padding: 3px;
  color: var(--text-color);
  border: 2px solid var(--window-innerborder-color);
  border-radius: 7px;
  background-color: var(--window-background-color);
  box-shadow: 0px 0px 8px rgba(0 0 0 / 0.25);
`;
