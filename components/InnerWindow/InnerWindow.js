import styled from "styled-components";

export default function WindowIn({ children }) {
  return <InnerWindow>{children}</InnerWindow>;
}

const InnerWindow = styled.div`
  padding: 1rem;
  color: var(--text-color);
  border: 2px solid var(--window-border-color);
  border-radius: 7px;
  background-color: var(--main-background-color);
`;
