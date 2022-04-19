import React from "react";
import { Button } from "../Button/Button";
import UIMessage from "./UIMessage";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/UIMessage",
  component: UIMessage,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    Image: {
      defaultValue: "error",
      options: ["success", "empty", "error"],
      control: { type: "radio" },
    },
    Message: {
      defaultValue: "UI Message.",
      control: { type: "text" },
    },
    "Call to Action Message": {
      defaultValue: "Call to action text",
      control: { type: "text" },
    },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => (
  <UIMessage
    image={`images/${args.Image}.svg`}
    buttonText={args["Call to Action Message"]}
  >
    {args.Message}
  </UIMessage>
);

export const Standard = Template.bind({});
