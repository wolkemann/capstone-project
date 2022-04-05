import styled from "styled-components";

export default function PopupTitle({ children }) {
  return <Popup>{children}</Popup>;
}

const Popup = styled.div`
  display: flex;
  padding-left: 0.5rem;
  margin-bottom: 0.1rem;
  justify-content: space-between;
  align-items: center;
  color: var(--text-color);
  border: 2px solid var(--window-innerborder-color);
  border-radius: 7px;
  background-color: var(--main-background-color);
`;
