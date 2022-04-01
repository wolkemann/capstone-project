import { useRouter } from "next/router";
import useSWR from "swr";

import Navigation from "../../components/Navigation/Navigation";
import Letter from "../../components/Letter/Letter";

export default function ReplyToMail() {
  const router = useRouter();
  const { mailId } = router.query;
  const { data: mailToReply } = useSWR(`/api/mails/${mailId}`);

  return (
    <main>
      {mailToReply ? (
        <Letter authorId={mailToReply.authorId}>{mailToReply.text}</Letter>
      ) : null}
      <Navigation />
    </main>
  );
}
