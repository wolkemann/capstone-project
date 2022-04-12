/* ==========================

Importing Libraries

============================*/
import { useRouter } from "next/router";
import Image from "next/image";
import styled from "styled-components";
/* ==========================

Importing App Components

============================*/
import { Button } from "../../components/Button/Button";

export default function UIMessage({
  children,
  image,
  redirectURL,
  buttonText,
  handleSubmitState,
}) {
  const router = useRouter();
  return (
    <MessageWrapper>
      <StickerWrapper>
        <Image
          src={image}
          layout="fixed"
          width={250}
          height={250}
          priority={true}
          alt={children}
        />
      </StickerWrapper>
      <Button
        onClick={() => {
          if (redirectURL) {
            router.push(redirectURL);
          }
          if (handleSubmitState) {
            handleSubmitState("idle");
          }
        }}
      >
        {children} {buttonText}
      </Button>
    </MessageWrapper>
  );
}

const StickerWrapper = styled.div`
  padding: 1.5rem;
  color: var(--button-text-color);
  background-color: var(--window-background-color);
  border: 2px solid var(--button-border-color);
  border-radius: 999px;
  box-shadow: 5px 3px 2px 1px rgba(78, 10, 71, 0.57);
`;

const MessageWrapper = styled.div`
  width: 300px;
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 1em;
  flex-flow: column wrap;
  align-items: center;
  & button {
    width: 100%;
    font-size: 1.5em;
  }
`;
