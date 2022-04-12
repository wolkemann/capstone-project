/* ==========================

Importing Libraries

============================*/
import Head from "next/head";
import { useState } from "react";
import { useSession, getSession } from "next-auth/react";
import styled from "styled-components";
/* ==========================

Importing App Components

============================*/
import WriteMailForm from "../components/WriteMailForm/WriteMailForm";
import { Button } from "../components/Button/Button";
import Navigation from "../components/Navigation/Navigation";
import Loader from "../components/Loader/Loader";
import UIMessage from "../components/UIMessage/UIMessage";

export default function Home() {
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
          <Head>
            <title>Sending Letter... :: Gentle Letters</title>
          </Head>
          <Loader text="Sending Letter..." />
        </main>
      );
    case "success":
      return (
        <main>
          <Head>
            <title>Yay! :: Gentle Letters</title>
          </Head>
          <UIMessage
            image="/images/success.svg"
            redirectURL="/"
            buttonText="Go to your Dashboard"
          >
            Your Letter was successfully sent to a random user. Now is time to
            relax and wait for your reply letter!
          </UIMessage>
        </main>
      );
    case "error":
      return (
        <main>
          <Head>
            <title>Oops! :: Gentle Letters</title>
          </Head>
          <UIMessage
            image="/images/error.svg"
            redirectURL="/send/"
            buttonText="Try again"
            handleSubmitState={setSubmitState}
          >
            Oops! Something went wrong...
          </UIMessage>
        </main>
      );
    default:
      return (
        <main>
          <Head>
            <title>Write a Letter :: Gentle Letters</title>
          </Head>
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
