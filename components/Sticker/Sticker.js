import { useState } from "react";
import styled from "styled-components";

export default function Sticker({ image, isSelected, onStickerClick }) {
  return (
    <StickerWrapper
      onClick={onStickerClick}
      style={
        isSelected
          ? { borderColor: "crimson" }
          : { borderColor: "var(--button-border-color)" }
      }
    >
      <img src={`/stickers/${image}`} />
    </StickerWrapper>
  );
}

export const StickerWrapper = styled.div`
  width: 136px;
  display: block;
  padding: 1rem;
  text-align: center;
  color: var(--button-text-color);
  background-color: var(--window-background-color);
  border: 2px solid var(--button-border-color);
  border-radius: 999px;
  box-shadow: 5px 3px 2px 1px rgba(78, 10, 71, 0.57);
  & img {
    display: block;
    margin: auto;
    width: 100px;
    height: 100px;
  }
`;
