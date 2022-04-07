import { useSession, getSession } from "next-auth/react";
import styled from "styled-components";
import useSWR from "swr";

import { StickersArray } from "../../utils/stickers";
import OuterWindow from "../../components/OuterWindow/OuterWindow";
import { InnerWindow } from "../../components/InnerWindow/InnerWindow";
import PopupTitle from "../../components/PopupTitle/PopupTitle";
import Navigation from "../../components/Navigation/Navigation";
import StickerCounter from "../../components/StickerCounter/StickerCounter";

export default function StickersPage() {
  const { data: session } = useSession();
  const { data: user } = useSWR(`/api/users/${session.user.id}`);

  return (
    <main>
      <OuterWindow>
        <PopupTitle>Stickers Collection</PopupTitle>
        <ContentWindow>
          {user
            ? StickersArray.map((sticker, index) => {
                return (
                  <StickerCounter
                    key={index}
                    stickerToCount={sticker.url}
                    stickers={user.stickers}
                  />
                );
              })
            : null}
        </ContentWindow>
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

const ContentWindow = styled(InnerWindow)`
  display: flex;
  flex-flow: row wrap;
  gap: 1rem;
  justify-content: space-between;
`;
