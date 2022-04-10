/* ==========================

Importing Libraries

============================*/
import Head from "next/head";
import { useSession, getSession } from "next-auth/react";
import Link from "next/link";
import useSWR from "swr";
import styled from "styled-components";
/* ==========================

Importing App Components

============================*/
import Loader from "../../components/Loader/Loader";
import Navigation from "../../components/Navigation/Navigation";
import InboxItem from "../../components/InboxItem/InboxItem";

export default function Inbox() {
  const { data: replies } = useSWR("/api/replies");

  if (replies) {
    const fliteredReplies = replies.filter((reply) => {
      return reply.reactionEmoji === false;
    });
  }

  return (
    <main>
      <Head>
        <title>Inbox :: Gentle Letters</title>
      </Head>
      {replies ? (
        fliteredReplies.map((reply) => {
          return (
            <Link
              href={`/inbox/browse?replyid=${reply._id}&letterid=${reply.mailRepliedId}`}
              key={reply._id}
            >
              <a>
                <InboxItem sender={reply.authorId} />
              </a>
            </Link>
          );
        })
      ) : (
        <Loader />
      )}

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

const LetterWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
`;
