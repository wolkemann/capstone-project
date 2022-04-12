/* ==========================

Importing Libraries

============================*/
import { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useSession, getSession } from "next-auth/react";
import styled from "styled-components";
/* ==========================

Importing App Components

============================*/
import WriteMailForm from "../../components/WriteMailForm/WriteMailForm";
import Navigation from "../../components/Navigation/Navigation";
import Letter from "../../components/Letter/Letter";
import { Button } from "../../components/Button/Button";
import Loader from "../components/Loader/Loader";
import UIMessage from "../components/UIMessage/UIMessage";

export default function ReplyToMail() {
  const [submitState, setSubmitState] = useState("idle");

  const { data: session } = useSession();
  const router = useRouter();
  const { mailId } = router.query;
  const { data: mailToReply } = useSWR(`/api/mails/${mailId}`);

  async function sendReply(event) {
    event.preventDefault();
    setSubmitState("pending");

    const response = await fetch("/api/replies", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        text: event.target.mailText.value,
        recipientId: mailToReply.authorId,
        mailRepliedId: mailToReply._id,
      }),
    });

    const createdReply = await response.json();

    if (response.ok) {
      const changeMailState = await fetch(`/api/mails/${mailId}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          hasAReply: true,
        }),
      });
      const mailReplied = await changeMailState.json();
      setSubmitState("success");
    } else {
    }
  }

  switch (submitState) {
    case "pending":
      return (
        <main>
          <Head>
            <title>Sending Reply... :: Gentle Letters</title>
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
            Your Reply was successfully sent! Good job! Your kind words will
            surely help your misterious friend.
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
          {mailToReply && !mailToReply.hasAReply ? (
            <Section>
              <WriteMailForm
                handleSubmit={sendReply}
                senderName={session.user.nickname}
                isReplyLetter={true}
              />
              <article>
                <Label>Original Letter</Label>
                <Letter authorId={mailToReply.authorId}>
                  {mailToReply.text}
                </Letter>
              </article>
            </Section>
          ) : null}
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

const Section = styled.section`
  display: flex;
  flex-flow: column wrap;
  gap: 1rem;
`;

const Label = styled.h2`
  width: 180px;
  padding: 0.5rem;
  color: var(--text-color);
  text-align: center;
  font-size: 1.2em;
  border: 3px solid var(--window-border-color);
  border-bottom-width: 0;
  border-radius: 2px;
  background-color: #f6c9f1;
  box-shadow: 5px 5px 2px 1px rgba(78, 10, 71, 0.57);
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
