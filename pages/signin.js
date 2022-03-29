import { getProviders, getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";
import Windowr from "../components/Windowr/Windowr";
import { Button } from "../components/Button/Button";
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
      <Windowr>
        <Title>Sign In</Title>
        <ProvidersContainer>
          {Object.values(providers).map((provider, index) => (
            <Button key={provider.name} onClick={() => signIn(provider.id)}>
              <Icon icon={providersIcon[index]} color="#f8f8f8" height="30" />
              <p>Sign in with {provider.name}</p>
            </Button>
          ))}
        </ProvidersContainer>
      </Windowr>
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
  margin: 1rem 0;
  margin-top: 0;
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
