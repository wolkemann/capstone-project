import styled from "styled-components";
import Link from "next/link";
import useSWR from "swr";
import { useState } from "react";
import WriteMailForm from "../../components/WriteMailForm/WriteMailForm";
import { Button } from "../../components/Button/Button";

export default function Home() {
  const mails = useSWR("/api/mails");

  const [submitState, setSubmitState] = useState("idle");
  const [error, setError] = useState();

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitState("pending");
    const response = await fetch("/api/mails", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text: event.target.mailText.value }),
    });
    const createdMail = await response.json();
    if (response.ok) {
      setSubmitState("success");
      mails.mutate();
      setError();
    } else {
      setSubmitState("error");
      setError(createdMail.error ?? "Something went wrong");
    }
  }

  switch (submitState) {
    case "pending":
      return (
        <Wrapper>
          <p>Pending</p>
        </Wrapper>
      );
    case "success":
      return (
        <Wrapper>
          <ResponseWindow>
            <ResponseTitle>Letter sent</ResponseTitle>
            <ResponseMessage>
              Your letter was successfully sent to another user! Now is time to
              relax and wait for your reply letter!
            </ResponseMessage>
            <Button as="a" href="/">
              Return to Home
            </Button>
          </ResponseWindow>
        </Wrapper>
      );
    case "error":
      return (
        <Wrapper>
          <ResponseWindow>
            <ResponseTitle>Error</ResponseTitle>
            <ResponseMessage>Oops! Something went wrong.</ResponseMessage>
            <Button as="a" href="/send/">
              Try again
            </Button>
          </ResponseWindow>
        </Wrapper>
      );
    default:
      return (
        <Wrapper>
          <WriteMailForm handleSubmit={handleSubmit} />
        </Wrapper>
      );
  }
}

const Wrapper = styled.main`
  margin: 1rem;
`;

const ResponseWindow = styled.div`
  display: flex;
  flex-flow: column wrap;
  height: 60vh;
  justify-content: center;
  align-items: center;
`;

const ResponseTitle = styled.p`
  font-size: 2.5em;
  margin: 1rem 0;
`;

const ResponseMessage = styled.p`
  font-size: 1.5em;
  margin: 1rem 0;
`;
