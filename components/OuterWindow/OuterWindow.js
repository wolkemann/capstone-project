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
  border: 2px solid var(--window-border-color);
  border-radius: 7px;
  background-color: var(--window-background-color);
  box-shadow: 5px 5px 2px 1px rgba(78, 10, 71, 0.57);
`;
