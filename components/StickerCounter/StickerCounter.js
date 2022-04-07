import { useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import styled from "styled-components";
import useSWR from "swr";

import Sticker from "../../components/Sticker/Sticker";

export default function StickerCounter({ stickerToCount, stickers }) {
  const [stickerCount, setStickerCount] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    setStickerCount(
      stickers.filter((sticker) => {
        return sticker.url === stickerToCount;
      }).length
    );
  }, [stickerCount]);

  return (
    <CounterWrapper>
      <Sticker image={stickerToCount} />
      <CounterText>{stickerCount}</CounterText>
    </CounterWrapper>
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

const CounterWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-content: center;
  justify-content: center;
`;

const CounterText = styled.p`
  font-size: 2em;
  text-align: center;
`;
