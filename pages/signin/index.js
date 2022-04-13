/* ==========================

Importing Libraries

============================*/
import Head from "next/head";
import Image from "next/image";
import { getProviders, getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";
/* ==========================

Importing App Components

============================*/
import PopupTitle from "../../components/PopupTitle/PopupTitle";
import OuterWindow from "../../components/OuterWindow/OuterWindow";
import { InnerWindow } from "../../components/InnerWindow/InnerWindow";
import { Button } from "../../components/Button/Button";
import { Icon } from "@iconify/react";

export default function SignIn({ providers }) {
  // you can use a hook like this to redirect the user after the login:
  const { data: session } = useSession();
  const router = useRouter();
  const providersIcon = ["akar-icons:google-contained-fill", "brandico:github"];

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <main>
      <Head>
        <title>Signin :: Gentle Letters</title>
      </Head>
      <H1>Welcome to Gentle Letters</H1>
      <OuterWindow>
        <PopupTitle>
          <Title>Sign In</Title>
        </PopupTitle>
        <InnerWindow>
          <ProvidersContainer>
            {Object.values(providers).map((provider, index) => (
              <Button
                key={provider.name}
                onClick={() =>
                  signIn(provider.id, {
                    callbackUrl: "/signin/success",
                  })
                }
              >
                <Icon icon={providersIcon[index]} color="#6926A9" height="30" />
                <p>Sign in with {provider.name}</p>
              </Button>
            ))}
            * github at the moment is only for local testing
          </ProvidersContainer>
        </InnerWindow>
      </OuterWindow>
    </main>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const providers = await getProviders();
  const session = await getSession();
  return {
    props: { providers },
  };
}

const H1 = styled.h1`
  color: #f6c9f1;
  text-shadow: 5px 5px rgba(78, 10, 71, 0.57);
  text-align: center;
  font-size: 2.5em;
  margin: 2rem 0;
`;

const Title = styled.h2`
  margin: 0.1rem auto;
  text-align: center;
`;

const ProvidersContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-flow: column wrap;

  & > button {
    display: flex;
    flex-flow: row nowrap;
  }
  & > button > p {
    flex: 1;
    text-align: center;
    align-self: center;
    font-size: 1.4em;
  }
`;
