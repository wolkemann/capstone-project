import useSWR from "swr";
import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/react";

import Letter from "../../components/Letter/Letter";
import Navigation from "../../components/Navigation/Navigation";

export default function SingleReply() {
  const router = useRouter();
  const { data: session } = useSession();
  const { replyid, letterid } = router.query;
  const { data: reply } = useSWR(`/api/replies/${replyid}`);
  const { data: letter } = useSWR(`/api/mails/${letterid}`);

  return (
    <main>
      {reply && letter ? (
        letter.authorId === session.user.id &&
        letter._id === reply.mailRepliedId ? (
          <>
            <Letter authorId={letter.authorId}>{letter.text}</Letter>
            <Letter isAReply={true} authorId={reply.authorId}>
              {reply.text}
            </Letter>
          </>
        ) : (
          <p>
            The user that is trying to watch this conversation is not the author
            of the letter
          </p>
        )
      ) : null}
      <Navigation />
    </main>
  );
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
