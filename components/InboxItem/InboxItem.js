import useSWR from "swr";
import styled from "styled-components";

import OuterWindow from "../../components/OuterWindow/OuterWindow";
import { Icon } from "@iconify/react";
import Loader from "../Loader/Loader";

export default function InboxItem({ sender }) {
  const { data: senderData } = useSWR(`/api/users/${sender}`);

  return (
    <>
      {senderData ? (
        <OuterWindow>
          <InnerContent>
            <Icon icon="ant-design:mail-outlined" height="55" />
            <SenderName>
              Reply from <strong>{senderData.nickname}</strong>
            </SenderName>
          </InnerContent>
        </OuterWindow>
      ) : (
        <Loader />
      )}
    </>
  );
}

const InnerContent = styled.div`
  display: flex;
  gap: 1rem;
  margin: 0.5rem;
`;

const SenderName = styled.div`
  align-self: center;
  & a > {
    text-decoration: none;
  }
`;
