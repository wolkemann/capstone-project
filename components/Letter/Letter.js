import { useState } from "react";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import useSWR from "swr";
import Link from "next/link";

import { Icon } from "@iconify/react";
import { Button } from "../Button/Button";
import UIMessage from "../UIMessage/UIMessage";

export default function Letter({
  children,
  isReplyLetter,
  authorId,
  replyId,
  showActions,
}) {
  const [submitState, setSubmitState] = useState("idle");
  const { data: session } = useSession();
  const author = useSWR(`/api/users/${authorId}`);

  async function handleShuffle() {
    const response = await fetch(
      `/api/mails/${replyId}?shuffle=true&authorId=${authorId}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
      }
    );
    const createdMail = await response.json();
    if (response.ok) {
      setSubmitState("success");
    } else {
      setSubmitState("error");
    }
  }
  switch (submitState) {
    case "pending":
      return (
        <>
          <Loader text="Sending Letter..." />
        </>
      );
    case "success":
      return (
        <UIWrapper>
          <UIMessage>
            Shuffle Successful! Another User will take care of this letter.
          </UIMessage>
        </UIWrapper>
      );
    case "error":
      return (
        <>
          <UIMessage
            image="/images/error.svg"
            redirectURL="/send/"
            buttonText="Try again"
            handleSubmitState={setSubmitState}
          >
            Oops! Something went wrong...
          </UIMessage>
        </>
      );
    default:
      return (
        <LetterWrapper
          style={isReplyLetter ? { backgroundColor: "#b4e0fa" } : null}
        >
          {author.data ? (
            <>
              <LetterContent style={showActions ? { minHeight: "53vh" } : null}>
                {children}
              </LetterContent>
              <ActionWrapper>
                <SenderSignature>
                  {author.data._id === session.user.id ? (
                    <>- Your Letter</>
                  ) : isReplyLetter ? (
                    <>
                      - Reply from <strong>{author.data.nickname}</strong>
                    </>
                  ) : (
                    <>
                      - Letter from <strong>{author.data.nickname}</strong>
                    </>
                  )}
                </SenderSignature>
                {showActions ? (
                  <LetterActions>
                    <Link href={`/reply/${replyId}`}>
                      <a>
                        <Button>
                          <Icon icon="pixelarticons:reply-all" height="40" />
                          Reply
                        </Button>
                      </a>
                    </Link>
                    <Button onClick={handleShuffle}>
                      <Icon icon="ant-design:cloud-sync-outlined" height="40" />
                      Shuffle Letter
                    </Button>
                  </LetterActions>
                ) : null}
              </ActionWrapper>
            </>
          ) : null}
        </LetterWrapper>
      );
  }
}

const UIWrapper = styled.div`
  & > div {
    width: 100%;
    transform: none;
    position: static;
  }
`;

const LetterWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  font-family: "Roboto Mono", monospace;
  padding: 1rem;
  color: var(--text-color);
  font-size: 1.2em;
  border: 3px solid var(--window-border-color);
  border-radius: 2px;
  background-color: #f6c9f1;
  box-shadow: 5px 5px 2px 1px rgba(78, 10, 71, 0.57);
`;

const LetterContent = styled.p`
  min-height: 61vh;
`;

const LetterActions = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  & a {
    text-decoration: none;
  }
  & button {
    display: flex;
    width: 100%;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
  }
`;

const SenderSignature = styled.p`
  text-align: right;
`;

const ActionWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 1rem;
  text-align: left;
`;
