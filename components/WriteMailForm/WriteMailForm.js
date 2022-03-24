import styled from "styled-components";
import { Button } from "../Button/Button";

export default function WriteMailForm() {
  return (
    <section>
      <MailContent></MailContent>
      <Button>Send</Button>
    </section>
  );
}

const MailContent = styled.textarea`
  resize: none;
  color: var(--text-color);
  font-size: 1.5em;
  margin: 1rem 0;
  padding: 1rem;
  width: 100%;
  height: 300px;
  border: 2px solid #877bf4;
  border-radius: 2px;
  background-color: var(--window-background-color);
  box-shadow: 0px 0px 8px rgba(0 0 0 / 0.25);
`;
