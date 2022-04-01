import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { Button } from "../Button/Button";

export default function WriteMailForm({ senderName, handleSubmit, isAReply }) {
  const [charUsed, setCharUsed] = useState(0);
  const [maxChar, setMaxChar] = useState(0);

  useEffect(() => {
    setMaxChar(mailText.maxLength);
  }, []);

  function handleOnChange(event) {
    setCharUsed(event.target.value.length);
  }

  return (
    <Form onSubmit={handleSubmit} id="writeMail">
      <LetterBody style={isAReply ? { backgroundColor: " #b4e0fa" } : null}>
        <MailContent
          style={isAReply ? { backgroundColor: "#b4e0fa" } : null}
          onChange={handleOnChange}
          id="mailText"
          name="mailText"
          placeholder={
            isAReply ? "Write your reply letter" : "Write your letter"
          }
          maxLength={560}
          required
        />
        <SignatureWrapper>
          <p>{maxChar - charUsed}</p>
          <p>
            -<strong> {senderName}</strong>
          </p>
        </SignatureWrapper>
      </LetterBody>
      <Button>Send</Button>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-flow: column wrap;
  & button {
    padding-left: 2rem;
    padding-right: 2rem;
    font-size: 1.2em;
    align-self: flex-end;
  }
`;

const LetterBody = styled.div`
  margin: 0.5rem 0;
  padding: 1rem;
  color: var(--text-color);
  font-size: 1.2em;
  border: 3px solid var(--window-border-color);
  border-radius: 2px;
  background-color: #f6c9f1;
  box-shadow: 5px 5px 2px 1px rgba(78, 10, 71, 0.57);
`;

const MailContent = styled.textarea`
  resize: none;
  width: 100%;
  height: 61vh;
  color: var(--text-color);
  font-size: 1em;
  border-width: 0;
  background-color: #f6c9f1;

  &:focus {
    outline: 0;
  }
`;

const SignatureWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
