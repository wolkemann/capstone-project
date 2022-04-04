import useSWR from "swr";
import styled from "styled-components";
import Letter from "../../components/Letter/Letter";

import Navigation from "../../components/Navigation/Navigation";

export default function Inbox() {
  const letters = useSWR("/api/mails");

  return (
    <main>
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
      ) : null}
      <Navigation />
    </main>
  );
}

const MailsWrapper = styled.section`
  display: flex;
  flex-flow: column wrap;
  gap: 2rem;
`;
