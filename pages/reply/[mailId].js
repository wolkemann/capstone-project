import { useRouter } from "next/router";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import styled from "styled-components";

import WriteMailForm from "../../components/WriteMailForm/WriteMailForm";
import Navigation from "../../components/Navigation/Navigation";
import Letter from "../../components/Letter/Letter";

export default function ReplyToMail() {
  const { data: session } = useSession();
  const router = useRouter();
  const { mailId } = router.query;
  const { data: mailToReply } = useSWR(`/api/mails/${mailId}`);

  async function sendReply(event) {
    event.preventDefault();

    const response = await fetch("/api/replies", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        text: event.target.mailText.value,
        recipientId: mailToReply.authorId,
        MailRepliedId: mailToReply._id,
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
    } else {
    }
  }

  return (
    <main>
      {mailToReply ? (
        <Section>
          <WriteMailForm
            handleSubmit={sendReply}
            senderName={session.user.nickname}
            isAReply={true}
          />
          <article>
            <Label>Original Letter</Label>
            <Letter authorId={mailToReply.authorId}>{mailToReply.text}</Letter>
          </article>
        </Section>
      ) : null}
      <Navigation />
    </main>
  );
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
