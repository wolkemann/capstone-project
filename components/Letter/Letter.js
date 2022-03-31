import styled from "styled-components";
import useSWR from "swr";

export default function Letter({ children, authorId }) {
  const author = useSWR(`/api/user/${authorId}`);

  return (
    <FormWrapper>
      {author.data ? (
        <>
          <p>{children}</p>
          <SenderSignature>
            - Letter from <strong>{author.data.nickname}</strong>
          </SenderSignature>
        </>
      ) : null}
    </FormWrapper>
  );
}

const FormWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  height: 70vh;
  margin: 0.5rem 0;
  padding: 1rem;
  color: var(--text-color);
  font-size: 1.2em;
  border: 2px solid var(--window-border-color);
  border-radius: 2px;
  background-color: #f6c9f1;
  box-shadow: 0px 0px 8px rgba(0 0 0 / 0.25);
`;

const SenderSignature = styled.p`
  text-align: right;
`;
