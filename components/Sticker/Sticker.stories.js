import React from "react";
import Sticker from "./Sticker";
import { StickersArray } from "../../utils/stickers";

const stickers = StickersArray.map((sticker) => {
  return sticker.url;
});

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Sticker",
  component: Sticker,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    image: {
      name: "Sticker Image",
      options: stickers,
      control: { type: "radio" },
    },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => (
  <Sticker image={args.image ? args.image : "00-heart.svg"} />
);

export const Standard = Template.bind({});
