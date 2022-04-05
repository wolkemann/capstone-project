import styled from "styled-components";
import { Icon } from "@iconify/react";
import Image from "next/image";

import OuterWindow from "../../components/OuterWindow/OuterWindow";
import InnerWindow from "../../components/InnerWindow/InnerWindow";
import PopupTitle from "../PopupTitle/PopupTitle";
import Attention from "../../public/images/attention.svg";

export default function StickersWindow() {
  return (
    <PopupWindow>
      <OuterWindow>
        <PopupTitle>
          <strong>Choose a Sticker.exe </strong>
          <Icon icon="ph:x-square-bold" height="30" />
        </PopupTitle>
        <InnerWindow>
          <StickersContainer></StickersContainer>
        </InnerWindow>
        <WarningWrapper>
          <Image src={Attention} width={250} height={250} priority={true} />
          <WarningText>
            When you send a Sticker, the correspondence between you and your
            misterious helper is concluded and will be delete from your inbox.
          </WarningText>
        </WarningWrapper>
      </OuterWindow>
    </PopupWindow>
  );
}

const PopupWindow = styled.aside`
  width: 360px;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
`;

const StickersContainer = styled.aside`
  height: 370px;
`;

const WarningWrapper = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
`;

const WarningText = styled.p`
  font-size: 0.8em;
  align-self: center;
`;
