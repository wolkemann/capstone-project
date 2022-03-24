import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { Button } from "../Button/Button";

export default function WriteMailForm({ handleSubmit }) {
  const [charUsed, setCharUsed] = useState(0);

  useEffect(() => {}, [charUsed]);

  function handleOnChange(event) {
    setCharUsed(event.target.value.length);
  }

  return (
    <section>
      <form onSubmit={handleSubmit} id="writeMail">
        <h1>Write Mail</h1>
        <FormWrapper>
          <MailContent
            onChange={handleOnChange}
            id="mailText"
            name="mailText"
            placeholder="Write your letter"
            required
          />
          <SignatureWrapper>
            <p>{charUsed}</p> <p>- Fede</p>
          </SignatureWrapper>
        </FormWrapper>
        <Button>Send</Button>
      </form>
    </section>
  );
}

const FormWrapper = styled.div`
  margin: 0.5rem 0;
  padding: 1rem;
  color: var(--text-color);
  font-size: 1.5em;
  border: 2px solid #877bf4;
  border-radius: 2px;
  background-color: var(--window-background-color);
  box-shadow: 0px 0px 8px rgba(0 0 0 / 0.25);
`;

const MailContent = styled.textarea`
  resize: none;
  width: 100%;
  height: 60vh;
  color: var(--text-color);
  font-size: 1em;
  border-width: 0;
  background-color: var(--window-background-color);

  &:focus {
    outline: 0;
  }
`;

const SignatureWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
