import styled from "styled-components";

export default function Input({ type, name, id, placeholder }) {
  return (
    <StyledInput type={type} name={name} id={id} placeholder={placeholder} />
  );
}

const StyledInput = styled.input`
  padding: 0.5rem 1rem;
  background-color: var(--window-background-color);
  border: 2px solid var(--window-border-color);
  border-radius: 7px;
`;
