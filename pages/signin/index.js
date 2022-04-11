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
        <title>Login :: Gentle Letters</title>
      </Head>
      <Image src="/images/title.svg" width="200" height="200" layout="fixed" />
      <Title>Welcome to Gentle Letters</Title>
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

const Title = styled.h2`
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
