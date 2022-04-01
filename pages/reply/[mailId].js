import { useRouter } from "next/router";
import useSWR from "swr";
import { useSession } from "next-auth/react";
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
        <>
          <WriteMailForm
            handleSubmit={sendReply}
            senderName={session.user.nickname}
            isAReply={true}
          />
          <Letter authorId={mailToReply.authorId}>{mailToReply.text}</Letter>
        </>
      ) : null}
      <Navigation />
    </main>
  );
}
