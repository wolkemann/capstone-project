import styled from "styled-components";
import useSWR from "swr";
import { Icon } from "@iconify/react";
import { Button } from "../Button/Button";

export default function Letter({ children, authorId }) {
  const author = useSWR(`/api/users/${authorId}`);

  return (
    <LetterWrapper>
      {author.data ? (
        <>
          <p>{children}</p>
          <ActionWrapper>
            <SenderSignature>
              - Letter from <strong>{author.data.nickname}</strong>
            </SenderSignature>
            <LetterActions>
              <Button>
                <Icon icon="pixelarticons:reply-all" height="40" />
                Reply
              </Button>
              <Button>
                <Icon icon="ant-design:cloud-sync-outlined" height="40" />
                Shuffle Letter
              </Button>
            </LetterActions>
          </ActionWrapper>
        </>
      ) : null}
    </LetterWrapper>
  );
}

const LetterWrapper = styled.div`
  display: flex;
  margin-bottom: 2rem;
  flex-flow: column wrap;
  justify-content: space-between;
  min-height: 80vh;
  padding: 1rem;
  color: var(--text-color);
  font-size: 1.2em;
  border: 2px solid var(--window-border-color);
  border-radius: 2px;
  background-color: #f6c9f1;
  box-shadow: 0px 0px 8px rgba(0 0 0 / 0.25);
`;

const LetterActions = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  & button {
    display: flex;
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
