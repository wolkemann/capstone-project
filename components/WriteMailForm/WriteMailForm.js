import styled from "styled-components";
import { Button } from "../Button/Button";

export default function WriteMailForm({ handleSubmit }) {
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h1>Write Mail</h1>
        <MailContent required />
        <Button>Send</Button>
      </form>
    </section>
  );
}

const MailContent = styled.textarea`
  resize: none;
  color: var(--text-color);
  font-size: 1.5em;
  margin: 1rem 0;
  margin-bottom: 0.2rem;
  padding: 1rem;
  width: 100%;
  height: 65vh;
  border: 2px solid #877bf4;
  border-radius: 2px;
  background-color: var(--window-background-color);
  box-shadow: 0px 0px 8px rgba(0 0 0 / 0.25);
`;
