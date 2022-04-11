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
import UIMessage from "../../components/UIMessage/UIMessage";

export default function Reply() {
  const letters = useSWR("/api/mails");

  if (letters.data) {
    const filteredLetters = letters.data.filter(
      (letter) => letter.hasAReply === false
    );
  }

  return (
    <main>
      <Head>
        <title>Reply :: Gentle Letters</title>
      </Head>
      {letters.data ? (
        <MailsWrapper>
          {filteredLetters.isArray() && filteredLetters.length > 0 ? (
            filteredLetters.data.map((letter) => {
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
            })
          ) : (
            <UIMessage
              image="/images/empty.svg"
              buttonText="Why don't you write a Letter first?"
              redirectURL="/send/"
            >
              There are no letters you can write a reply to.
            </UIMessage>
          )}
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
