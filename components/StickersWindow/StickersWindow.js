import { useState, useContext } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import Image from "next/image";

import { UserContext } from "../../pages/inbox/browse";
import { StickersArray } from "../../utils/stickers";
import OuterWindow from "../../components/OuterWindow/OuterWindow";
import { InnerWindow } from "../../components/InnerWindow/InnerWindow";
import PopupTitle from "../PopupTitle/PopupTitle";
import { Button } from "../Button/Button";
import Attention from "../../public/images/attention.svg";
import Sticker from "../Sticker/Sticker";

export default function StickersWindow({ onSendSticker }) {
  const { showPopup, setShowPopup, selectedSticker, setSelectedSticker } =
    useContext(UserContext);
  const [stickersList, setStickersList] = useState(StickersArray);

  /*

  handleOnStickerClick handles the stickers selection 
  
  */
  function handleOnStickerClick(stickerIndex) {
    const updatedStickersList = stickersList.map((sticker, index) => {
      /* 
      if the sticker index is the same from the one called in the function
      then we return a new object with the prop "isSelected" set to "true"
        */
      if (stickerIndex === index) {
        if (sticker.isSelected === true) {
          /* 
          if the clicked sticker was already selected then we deselect it
          returning an object where "isSelected" is "false"
          */
          setSelectedSticker(undefined);
          return { ...sticker, isSelected: false };
        }
        setSelectedSticker(sticker.url);
        return { ...sticker, isSelected: true };
      } else {
        return { ...sticker, isSelected: false };
      }
    });
    setStickersList(updatedStickersList);
  }

  return (
    <PopupWindow style={showPopup ? { display: "block" } : { display: "none" }}>
      <OuterWindow>
        <PopupTitle>
          <strong>Stickers/{selectedSticker} </strong>
          <Icon
            icon="ph:x-square-bold"
            height="30"
            onClick={() => {
              setShowPopup(false);
            }}
          />
        </PopupTitle>
        <InnerWindow as="section">
          <StickersContainer>
            {stickersList.map((sticker, index) => {
              return (
                <Sticker
                  key={index}
                  image={sticker.url}
                  isSelected={sticker.isSelected}
                  onStickerClick={() => {
                    handleOnStickerClick(index);
                  }}
                />
              );
            })}
          </StickersContainer>
        </InnerWindow>

        {selectedSticker ? (
          <>
            <WarningWrapper>
              <Image
                src={Attention}
                width={250}
                height={250}
                priority={true}
                alt="warning message"
              />
              <WarningText>
                When you send a Sticker, the correspondence between you and your
                misterious helper is concluded and will be deleted from your
                inbox.
              </WarningText>
            </WarningWrapper>
            <Button onClick={onSendSticker}>Send Sticker</Button>
          </>
        ) : null}
      </OuterWindow>
    </PopupWindow>
  );
}

const PopupWindow = styled.aside`
  width: 360px;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  & section {
    padding: 0 0 0 0.5rem;
  }
  & button {
    margin: 0.5rem 0.5rem;
  }
`;

const StickersContainer = styled.aside`
  padding-top: 0.5rem;
  padding-right: 1rem;
  padding-bottom: 0.5rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-content: flex-start;
  gap: 1rem;
  height: 330px;
  overflow: auto;
`;

const WarningWrapper = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
  & button {
    border-radius: 999px;
  }
`;

const WarningText = styled.p`
  font-size: 0.8em;
  align-self: center;
`;
