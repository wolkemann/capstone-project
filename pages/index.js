/* ==========================

Importing Libraries

============================*/
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import styled from "styled-components";
import { useSession, getSession, signIn, signOut } from "next-auth/react";
import useUserStat from "../utils/useUserStat";
/* ==========================

Importing App Components

============================*/
import Navigation from "../components/Navigation/Navigation";
import PopupTitle from "../components/PopupTitle/PopupTitle";
import OuterWindow from "../components/OuterWindow/OuterWindow";
import { InnerWindow } from "../components/InnerWindow/InnerWindow";
import { Button } from "../components/Button/Button";
import { Icon } from "@iconify/react";
import DashboardStatistics from "../components/DashboardStatistics/DashboardStatistics";

export default function Home() {
  const { data: session } = useSession();
  const lettersSent = useUserStat(session.user.id, "mails");
  const repliesSent = useUserStat(session.user.id, "replies");

  return (
    <main>
      <Head>
        <title>Gentle Letters</title>
      </Head>
      <OuterWindow>
        <PopupTitle>
          <h2>{session.user.nickname}</h2>
          <Logout onClick={() => signOut()}>
            <Icon icon="ci:exit" height="20" />
          </Logout>
        </PopupTitle>
        <InnerWindow>
          <DashboardStatistics
            lettersSent={lettersSent}
            repliesSent={repliesSent}
          />

          <Link href="/send/">
            <BigButton>
              <Icon icon="fluent:code-text-edit-20-regular" height="55" />
              Write a Letter
            </BigButton>
          </Link>

          <Link href="/reply/">
            <BigButton>
              <Icon icon="pixelarticons:reply-all" height="55" />
              Write a Reply
            </BigButton>
          </Link>
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

const BigButton = styled(Button)`
  width: 100%;
  font-size: 1.5em;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  padding: 2rem;
  margin: 0.5rem 0;
  gap: 1rem;
  & :last-child {
    margin-bottom: 0;
  }
`;

const Logout = styled(Button)`
  display: flex;
  margin: 5px;
  border-radius: 999px;
  padding: 5px;
  box-shadow: none;
`;
