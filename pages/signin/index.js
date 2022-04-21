/* ==========================

Importing Libraries

============================*/
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { getProviders, getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";
/* ==========================

Importing App Components

============================*/
import LandingPage from "../../components/LandingPage/LandingPage";
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
    <Main>
      <Head>
        <title>Signin :: Gentle Letters</title>
      </Head>

      <LogInSection>
        <Header>
          <H1>Welcome to Gentle Letters</H1>
          <ImageWrap>
            <Image
              src="/images/logo.png"
              width={200}
              height={200}
              layout="responsive"
            />
          </ImageWrap>
          <ButtonsWrapper>
            <Link href="#login">
              <a
                style={{
                  textDecoration: "none",
                  alignSelf: "flex-start",
                }}
              >
                <LearnMoreButton>Register</LearnMoreButton>
              </a>
            </Link>
            <Link href="#about">
              <a
                style={{
                  textDecoration: "none",
                  alignSelf: "flex-start",
                }}
              >
                <LearnMoreButton>Learn more</LearnMoreButton>
              </a>
            </Link>
          </ButtonsWrapper>
        </Header>
      </LogInSection>

      <LogInSection id="login">
        <div style={{ margin: "auto", width: "100%" }}>
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
                    <Icon
                      icon={providersIcon[index]}
                      color="#6926A9"
                      height="30"
                    />
                    <p>Sign in with {provider.name}</p>
                  </Button>
                ))}
              </ProvidersContainer>
            </InnerWindow>
          </OuterWindow>
        </div>
      </LogInSection>

      <Section id="about">
        <LandingPage />
      </Section>
    </Main>
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
  font-size: 2.5em;
  @media (min-width: 800px) {
    font-size: 3.5em;
  }
`;

const Title = styled.h2`
  margin: 0.1rem auto;
  text-align: center;
`;

const Main = styled.main`
  margin: 0;
`;

const Header = styled.header`
  display: flex;
  flex-flow: column wrap;
  width: 320px;
  margin: auto;
  @media (min-width: 800px) {
    width: 400px;
  }
`;

const ImageWrap = styled.span`
  align-self: flex-end;
  display: block;
  width: 100px;
  margin-top: -65px;
  @media (min-width: 800px) {
    margin-right: -65px;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const Section = styled.section`
  padding: 1rem;
  min-height: 100vh;
`;

const LogInSection = styled(Section)`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`;

const LearnMoreButton = styled(Button)`
  font-size: 1.2em;
  margin-bottom: 0.5rem;
  padding: 0.8rem;
  @media (min-width: 800px) {
    font-size: 1.5em;
    padding: 1rem 0.8rem;
  }
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
