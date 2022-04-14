import styled from "styled-components";

export const Button = styled.button`
  display: block;
  padding: 0.7rem 1rem;
  text-align: center;
  color: var(--button-text-color);
  background-color: var(--button-background-color);
  border: 2px solid var(--button-border-color);
  border-radius: 5px;
  box-shadow: 5px 3px 2px 1px rgba(78, 10, 71, 0.57);
  &:hover {
    cursor: pointer;
  }
`;
