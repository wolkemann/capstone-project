/* ==========================

Importing Libraries

============================*/
import Head from "next/head";
import useSWR from "swr";
import styled from "styled-components";
/* ==========================

Importing App Components

============================*/
import Letter from "../../components/Letter/Letter";
import Navigation from "../../components/Navigation/Navigation";
import Loader from "../../components/Loader/Loader";

export default function Reply() {
  const letters = useSWR("/api/mails");

  return (
    <main>
      <Head>
        <title>Reply :: Gentle Letters</title>
      </Head>
      {letters.data ? (
        <MailsWrapper>
          {letters.data
            .filter((letter) => letter.hasAReply === false)
            .map((letter) => {
              return (
                <Letter
                  key={letter._id}
                  authorId={letter.authorId}
                  replyId={letter._id}
                  showActions={true}
                >
                  {letter.text}
                </Letter>
              );
            })}
        </MailsWrapper>
      ) : (
        <Loader />
      )}
      <Navigation />
    </main>
  );
}

const MailsWrapper = styled.section`
  display: flex;
  flex-flow: column wrap;
  gap: 2rem;
`;
