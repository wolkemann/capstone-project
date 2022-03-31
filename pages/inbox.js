import useSWR from "swr";
import styled from "styled-components";

import { Button } from "../components/Button/Button";
import Letter from "../components/Letter/Letter";
import { Icon } from "@iconify/react";
import Navigation from "../components/Navigation/Navigation";

export default function Inbox() {
  const letters = useSWR("/api/mails");

  return (
    <main>
      {letters.data ? (
        <MailsWrapper>
          {letters.data.map((letter) => {
            return (
              <LetterWrapper key={letter._id}>
                <Letter authorId={letter.authorId}>{letter.text}</Letter>
                <LetterActions>
                  <Button>
                    <Icon icon="ic:round-reply-all" height="40" />
                    Send a reply
                  </Button>
                  <Button></Button>
                </LetterActions>
              </LetterWrapper>
            );
          })}
        </MailsWrapper>
      ) : null}
      <Navigation />
    </main>
  );
}

const MailsWrapper = styled.section``;
const LetterWrapper = styled.div``;
const LetterActions = styled.div`
  width: 100%;
  display: flex;
  & button {
    display: flex;
    flex-flow: column wrap;
    gap: 0.5rem;
    align-items: center;
  }
`;
