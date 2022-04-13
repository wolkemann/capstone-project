/* ==========================

Importing Libraries

============================*/
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import styled from "styled-components";
import { useSession, getSession, signIn, signOut } from "next-auth/react";
/* ==========================

Importing App Components

============================*/

import WindowOut from "../components/OuterWindow/OuterWindow";
import { InnerWindow } from "../components/InnerWindow/InnerWindow";
import { Button } from "../components/Button/Button";

export default function LandingPage() {
  return (
    <Main>
      <Section>
        <H1>Welcome to Gentle Letters</H1>
        <BoxWrapper>
          <p>
            Today is all about Facebook, Instagram and TickTock. But these
            Socials are just huge shopping malls where people only showcase
            their best goods, the "very best of" of their lives.
          </p>
          <p>
            Real life is made of ups and downs, and when you are forced by
            competition to show only the best of you, then the best of you
            becomes a manufactured, artificial thing, very far from the real
            you.
          </p>
          <p>
            Sometimes we need a relaxing place where we can talk about
            everything without the fear of social pressure, without filters and
            with someone willing to listen to us.
          </p>
          <p>
            This is the reason behind <strong>Gentle Letters</strong>.
          </p>
        </BoxWrapper>
      </Section>
      <Section>
        <H2>How it works?</H2>
        <BoxWrapper>
          <H3>Anonymous Enviroment</H3>
          <p>
            <strong>Gentle Letters</strong> should be a place where people can
            relax and talk freely. To achieve this, the best way to do this is
            through a place where a person can be a nickname and nothing else.
          </p>
          <p>
            To avoid the occurrence of someone using a name that could exactly
            identify them, the first time someone sign in a random nickname will
            be assigned.
          </p>
          <p>
            The nickname generation process follows this pattern:
            adjective_animal (i.e. laughing_octopus)
          </p>
          <H3>Writing Letters and Replies</H3>
          <p>
            Whenever you want to express a thought and share it with someone
            else, you can write a Letter and send it around.
          </p>
          <p>
            The Letter is then received by a random member who can interact with
            you by sending you a reply letter. in this way you will always
            receive help from different people, a bit like talking to a stranger
            on a long journey.
          </p>
          <H3>Sending Stickers</H3>
          <p>
            As a token of appreciation for the kind words you received, you can
            send a sticker to the person who welcomed your letter and decided to
            be so kind to help you.
          </p>
        </BoxWrapper>
        <Button>
          Intrigued?
          <br />
          Register now!
        </Button>
      </Section>
    </Main>
  );
}

const Main = styled.main`
  font-size: 1.2em;
  color: #f6c9f1;
  margin: 0;
`;

const H1 = styled.h1`
  text-align: center;
  font-size: 2.5em;
`;

const H2 = styled.h2`
  text-align: center;
  font-size: 2.5em;
`;

const H3 = styled.h3`
  text-align: center;
  font-weight: normal;
  margin: 2rem 0;
  font-style: italic;
  font-size: 1.5em;
`;

const Section = styled.section`
  padding: 1rem;
  min-height: 100vh;
`;

const BoxWrapper = styled.article`
  margin: 1rem 0;
  padding: 0rem;
  & p {
    margin: 1.5rem 0;
  }
`;
