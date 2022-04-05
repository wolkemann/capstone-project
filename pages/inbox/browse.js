import useSWR from "swr";
import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/react";
import styled from "styled-components";
import { Icon } from "@iconify/react";

import StickersWindow from "../../components/StickersWindow/StickersWindow";
import Letter from "../../components/Letter/Letter";
import Navigation from "../../components/Navigation/Navigation";
import { Button } from "../../components/Button/Button";

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
          <Wrapper>
            <Letter authorId={letter.authorId}>{letter.text}</Letter>
            <Letter isReplyLetter={true} authorId={reply.authorId}>
              {reply.text}
            </Letter>
            <Button>
              <Icon icon="fluent:sticker-20-regular" height="50" />
              Do you like this letter?
              <br />
              Send a Sticker!
            </Button>

            <StickersWindow />
          </Wrapper>
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

const Wrapper = styled.section`
  display: flex;
  flex-flow: column wrap;
  gap: 1rem;
  & button {
    font-size: 1.2em;
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }
`;
