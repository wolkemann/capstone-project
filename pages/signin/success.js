import styled from "styled-components";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";

import OuterWindow from "../../components/OuterWindow/OuterWindow";
import InnerWindow from "../../components/InnerWindow/InnerWindow";
import { Button } from "../../components/Button/Button";
import { Icon } from "@iconify/react";
import SuccessSmile from "/welcome.png";
import WhatToDo from "/WhatToDo.png";

export default function SuccessMessage() {
  const { data: session } = useSession();
  const [createdNickname, setCreatedNickname] = useState(session.user.nickname);

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
    <Main>
      <OuterWindow>
        <ImageCenter>
          <Image src={SuccessSmile} layout="fixed" width={180} height={180} />
        </ImageCenter>
        <InnerWindow>
          <h2>Welcome to Gentle Letters!</h2>
          <p>
            The <strong>{createdNickname}</strong> nickname has been assigned to
            you.
          </p>
        </InnerWindow>
        <ImageCenter>
          <Image src={WhatToDo} layout="fixed" width={180} height={180} />
        </ImageCenter>
        <InnerWindow>
          <h2>What to do now?</h2>
          <Link href="/send/">
            <Button>
              <Icon
                icon="pixelarticons:chart-add"
                color="#877bf4"
                height="55"
              />
              Write your first Letter
            </Button>
          </Link>
          <Link href="/">
            <Button>
              <Icon icon="bxs:dashboard" color="#877bf4" height="55" />
              Go to your Dashboard
            </Button>
          </Link>
        </InnerWindow>
      </OuterWindow>
    </Main>
  );
}

const ImageCenter = styled.div`
  display: flex;
  justify-content: center;
`;

const Main = styled.main`
  margin-bottom: 0.5rem;

  & h2 {
    text-align: center;
    margin: 1rem 0;
  }

  & button {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    width: 100%;
    padding: 2rem;
    margin: 1rem 0;
    font-size: 1.5em;
  }

  & button:last-child {
    margin-bottom: 0;
  }
`;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    /* if (session.user.nickname) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      }; 
    }
    */
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
