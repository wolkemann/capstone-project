import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

import styled from "styled-components";
import OuterWindow from "../../components/OuterWindow/OuterWindow";
import InnerWindow from "../../components/InnerWindow/InnerWindow";
import { Button } from "../../components/Button/Button";
import { Icon } from "@iconify/react";

export default function SuccessMessage() {
  const { data: session } = useSession();
  const [createdNickname, setCreatedNickname] = useState();

  useEffect(() => {
    async function assignNickname() {
      const response = await fetch(`/api/signin/${session.user.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
      });
      const updateUser = await response.json();
      console.log(updateUser);
      setCreatedNickname(updateUser.data.nickname);
    }

    if (!session.user.nickname) {
      assignNickname();
    }
  }, []);

  return (
    <main>
      <OuterWindow>
        <InnerWindow>
          Welcome new user! The {createdNickname} nickname has been assigned to
          you.
        </InnerWindow>
      </OuterWindow>
    </main>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    if (session.user.nickname) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  } else {
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
