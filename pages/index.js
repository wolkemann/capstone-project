import { useSession, getSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

import styled from "styled-components";

import Input from "../components/Input/Input";
import Navigation from "../components/Navigation/Navigation";
import Windowr from "../components/Windowr/Windowr";
import { Button } from "../components/Button/Button";

export default function Home() {
  return (
    <main>
      <Windowr>
        <Input type="text" id="email" name="email" placeholder="email" />
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="password"
        />
        <button
          onClick={() => signIn()}
          style={{ backgroundColor: "lightgray" }}
        >
          Sign in
        </button>
        <button
          onClick={() => signOut()}
          style={{ backgroundColor: "lightgray" }}
        >
          Sign out
        </button>
        <Navigation />
      </Windowr>
    </main>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
