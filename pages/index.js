import Link from "next/link";
import styled from "styled-components";
import { getSession, signIn } from "next-auth/react";

import { Input } from "../components/Input/Input";
import Navigation from "../components/Navigation/Navigation";
import Windowr from "../components/Windowr/Windowr";
import { Button } from "../components/Button/Button";

export default function Home() {
  return (
    <main>
      <Windowr>davai</Windowr>
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
