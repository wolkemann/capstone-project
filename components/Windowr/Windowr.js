import styled from "styled-components";

export default function Windowr({ children }) {
  return (
    <OuterWindow>
      <InnerWindow>{children}</InnerWindow>
    </OuterWindow>
  );
}

const OuterWindow = styled.div`
  margin: 0.5rem 0;
  padding: 3px;
  color: var(--text-color);
  font-size: 1.2em;
  border: 2px solid var(--window-border-color);
  border-radius: 7px;
  background-color: var(--window-background-color);
  box-shadow: 0px 0px 8px rgba(0 0 0 / 0.25);
`;

const InnerWindow = styled.div`
  padding: 1rem;
  color: var(--text-color);
  border: 2px solid var(--window-border-color);
  border-radius: 7px;
  background-color: var(--main-background-color);
`;
