import { useSession, getSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

import styled from "styled-components";
import { Button } from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Windowr from "../../components/Windowr/Windowr";

export default function Home() {
  function handleSubmit(event) {
    event.preventDefault();
  }
  return (
    <main>
      <h2>Create Account</h2>
      <Windowr>
        <Form onSubmit={handleSubmit}>
          <label htmlFor="email">E-mail</label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Please enter a valid email"
            required
          />
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Set password"
            required
          />
          <Input
            type="password"
            id="confirmpassword"
            name="confirmpassword"
            placeholder="Confirm password"
            required
          />
          <Button>Create account</Button>
        </Form>
      </Windowr>
    </main>
  );
}

const Form = styled.form`
  display: flex;
  flex-flow: column wrap;
  gap: 1rem;
`;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
