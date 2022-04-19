import React from "react";
import DashboardStatistics from "./DashboardStatistics";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/DashboardSatistics",
  component: DashboardStatistics,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    lettersSent: {
      name: "Letters sent",
      type: "number",
      defaultValue: 0,
      description: "Letters sent value",
      control: { type: "number" },
    },
    repliesSent: {
      name: "Replies sent",
      type: "number",
      defaultValue: 0,
      description: "Replies sent value",
      control: { type: "number" },
    },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => (
  <DashboardStatistics
    {...args}
    lettersSent={args.lettersSent}
    repliesSent={args.repliesSent}
  />
);

export const Standard = Template.bind({});
