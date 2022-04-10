/* ==========================

Importing Libraries

============================*/
import Image from "next/image";
import styled from "styled-components";
/* ==========================

Importing App Components

============================*/

export default function Loader({ text }) {
  return (
    <LoaderContainerOuter>
      <LoaderContainer>
        <Image
          src="/images/loader2.svg"
          layout="responsive"
          width="70"
          height="10"
          priority={true}
          alt="Page is loading..."
        />
      </LoaderContainer>
      <LoadingText>{text ? text : "Loading"}</LoadingText>
    </LoaderContainerOuter>
  );
}
const LoaderContainerOuter = styled.div`
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
  padding: 3px;
  color: var(--text-color);
  border: 2px solid var(--window-border-color);
  border-radius: 7px;
  background-color: var(--window-background-color);
  box-shadow: 5px 5px 2px 1px rgba(78, 10, 71, 0.57);
`;

const LoaderContainer = styled.div`
  padding: 0.5rem;
  border: 2px solid var(--window-innerborder-color);
  border-radius: 7px;
  background-color: var(--main-background-color);
`;

const LoadingText = styled.p`
  text-align: center;
  font-size: 1.5em;
  margin: 0.2rem 0;
`;
