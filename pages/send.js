/* ==========================

Importing Libraries

============================*/
import useSWR from "swr";
import { useState } from "react";
import { useSession, getSession } from "next-auth/react";
import styled from "styled-components";
/* ==========================

Importing App Components

============================*/
import WriteMailForm from "../components/WriteMailForm/WriteMailForm";
import { Button } from "../components/Button/Button";
import Navigation from "../components/Navigation/Navigation";

export default function Home() {
  const mails = useSWR("/api/mails");
  const { data: session } = useSession();

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
        <main>
          <p>Pending</p>
          <Navigation />
        </main>
      );
    case "success":
      return (
        <main>
          <ResponseWindow>
            <ResponseTitle>Letter sent</ResponseTitle>
            <ResponseMessage>
              Your letter was successfully sent to another random user! Now is
              time to relax and wait for your reply letter!
            </ResponseMessage>
            <Button as="a" href="/">
              Return to Home
            </Button>
          </ResponseWindow>
          <Navigation />
        </main>
      );
    case "error":
      return (
        <main>
          <ResponseWindow>
            <ResponseTitle>Error</ResponseTitle>
            <ResponseMessage>Oops! Something went wrong.</ResponseMessage>
            <Button as="a" href="/send/">
              Try again
            </Button>
          </ResponseWindow>
          <Navigation />
        </main>
      );
    default:
      return (
        <main>
          <WriteMailForm
            senderName={session.user.nickname}
            handleSubmit={handleSubmit}
          />
          <Navigation />
        </main>
      );
  }
}
export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/signin/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

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
