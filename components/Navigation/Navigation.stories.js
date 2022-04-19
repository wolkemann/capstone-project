import React from "react";
import Navigation from "./Navigation";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Navigation",
  component: Navigation,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    "Current Page": {
      defaultValue: "home",
      options: ["send", "reply", "home", "inbox", "stickers"],
      control: { type: "radio" },
    },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => (
  <>
    {console.log(args)}
    <Navigation
      currentPage={
        args["Current Page"] === "home" ? null : args["Current Page"]
      }
    />
  </>
);

export const Standard = Template.bind({});
