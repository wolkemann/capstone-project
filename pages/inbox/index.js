import { useSession, getSession } from "next-auth/react";
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
            return <InboxItem key={reply._id} sender={reply.authorId} />;
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
