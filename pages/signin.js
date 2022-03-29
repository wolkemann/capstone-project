import { getSession } from "next-auth/react";
import { getCsrfToken } from "next-auth/react";
import Windowr from "../components/Windowr/Windowr";
import { Input } from "../components/Input/Input";
import { Button } from "../components/Button/Button";

export default function SignIn({ csrfToken }) {
  return (
    <main>
      <Windowr>
        <form method="post" action="/api/auth/callback/credentials">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label>
            Username
            <Input name="username" type="text" />
          </label>
          <label>
            Password
            <Input name="password" type="password" />
          </label>
          <Button type="submit">Sign in</Button>
        </form>
      </Windowr>
    </main>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
