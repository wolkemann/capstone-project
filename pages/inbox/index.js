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
import UIMessage from "../../components/UIMessage/UIMessage";

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
        fliteredReplies.length > 0 ? (
          fliteredReplies.map((reply) => {
            return (
              <Link
                href={`/inbox/browse?replyid=${reply._id}&letterid=${reply.mailRepliedId}`}
                key={reply._id}
              >
                <a style={{ textDecoration: "none" }}>
                  <InboxItem sender={reply.authorId} />
                </a>
              </Link>
            );
          })
        ) : (
          <UIMessage
            image="/images/empty.svg"
            buttonText="Why don't you write a Letter first?"
            redirectURL="/send/"
          >
            There are no replies to browse.
          </UIMessage>
        )
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
