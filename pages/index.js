/* ==========================

Importing Libraries

============================*/
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import styled from "styled-components";
import { useSession, getSession, signIn, signOut } from "next-auth/react";
/* ==========================

Importing App Components

============================*/
import Navigation from "../components/Navigation/Navigation";
import OuterWindow from "../components/OuterWindow/OuterWindow";
import { InnerWindow } from "../components/InnerWindow/InnerWindow";
import { Button } from "../components/Button/Button";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main>
      <Head>
        <title>Gentle Letters</title>
      </Head>
      <OuterWindow>
        <InnerWindow>
          <h2>Welcome, {session.user.nickname}</h2>
          <Button onClick={() => signOut()}>Sign out</Button>
        </InnerWindow>
        <InnerWindow>
          <Button>Write a Letter</Button>
        </InnerWindow>
      </OuterWindow>
      <Navigation />
    </main>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/signin/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
