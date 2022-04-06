import { useSession, getSession } from "next-auth/react";
import Link from "next/link";
import useSWR from "swr";
import styled from "styled-components";

import Navigation from "../../components/Navigation/Navigation";
import InboxItem from "../../components/InboxItem/InboxItem";

export default function Inbox() {
  const { data: replies } = useSWR("/api/replies");

  return (
    <main>
      {replies
        ? replies.map((reply) => {
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
        : null}

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