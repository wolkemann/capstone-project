/* ==========================

Importing Libraries

============================*/
import { useSession, getSession } from "next-auth/react";
import styled from "styled-components";
import useSWR from "swr";
/* ==========================

Importing App Components

============================*/
import { StickersArray } from "../../utils/stickers";
import OuterWindow from "../../components/OuterWindow/OuterWindow";
import { InnerWindow } from "../../components/InnerWindow/InnerWindow";
import PopupTitle from "../../components/PopupTitle/PopupTitle";
import Navigation from "../../components/Navigation/Navigation";
import StickerCounter from "../../components/StickerCounter/StickerCounter";
import Sticker from "../../components/Sticker/Sticker";

export default function StickersPage() {
  const { data: session } = useSession();
  const { data: user } = useSWR(`/api/users/${session.user.id}`);

  return (
    <main>
      <OuterWindow>
        <PopupTitle>Recently Obtained Stickers</PopupTitle>
        <RecentStickersWrapper>
          {user
            ? user.stickers
                .slice(user.stickers.length - 5, user.stickers.length)
                .map((recentSticker, index) => {
                  return (
                    <RecentSticker key={index}>
                      <Sticker image={recentSticker.url} />
                      <p>
                        from <strong>{recentSticker.sender}</strong>
                      </p>
                    </RecentSticker>
                  );
                })
            : null}
        </RecentStickersWrapper>
      </OuterWindow>
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

const RecentStickersWrapper = styled(InnerWindow)`
  padding: 0.5em;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  height: 200px;
  overflow: auto;
  & div {
    padding: 0.5em;
  }
  & div > img {
    width: 50px;
    height: 50px;
  }
`;

const RecentSticker = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 1rem;
  align-items: center;
`;
