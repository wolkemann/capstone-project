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

  return (
    <main>
      {mailToReply ? (
        <>
          <WriteMailForm senderName={session.user.nickname} isAReply={true} />
          <Letter authorId={mailToReply.authorId}>{mailToReply.text}</Letter>
        </>
      ) : null}
      <Navigation />
    </main>
  );
}
