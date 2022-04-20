import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";

import { Button } from "../Button/Button";

export default function WriteMailForm({
  senderName,
  handleSubmit,
  isReplyLetter,
}) {
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
      <LetterBody
        style={isReplyLetter ? { backgroundColor: " #b4e0fa" } : null}
      >
        <MailContent
          style={isReplyLetter ? { backgroundColor: "#b4e0fa" } : null}
          onChange={handleOnChange}
          id="mailText"
          name="mailText"
          placeholder={
            isReplyLetter ? "Write your reply letter" : "Write your letter"
          }
          maxLength={560}
          required={true}
        />
        <SignatureWrapper>
          <p>{maxChar - charUsed}</p>
          <p>
            -<strong> {senderName}</strong>
          </p>
        </SignatureWrapper>
      </LetterBody>
      <Button>
        <Icon icon="bi:send" height="40" />
        {isReplyLetter ? "Send your reply" : "Send your Letter"}
      </Button>
    </Form>
  );
}

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  margin: auto;
  & button {
    font-size: 1.2em;
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    align-self: flex-end;
  }
  @media (min-width: 450px) {
    max-width: 450px;
  }
`;

const LetterBody = styled.div`
  margin: 1rem 0;
  margin-top: 0;
  padding: 1rem;
  color: var(--text-color);
  font-size: 1.2em;
  border: 3px solid var(--window-border-color);
  border-radius: 2px;
  background-color: #f6c9f1;
  box-shadow: 5px 5px 2px 1px rgba(78, 10, 71, 0.57);
`;

const MailContent = styled.textarea`
  font-family: "Roboto Mono", monospace;
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
  @media (min-width: 800px) {
    height: 67vh;
  }
`;

const SignatureWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
