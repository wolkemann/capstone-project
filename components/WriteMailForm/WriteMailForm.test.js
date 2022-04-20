import React from "react";
import WriteMailForm from "./WriteMailForm";
import {
  render,
  fireEvent,
  screen,
  cleanup,
  getByPlaceholderText,
} from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Write mail Form component testing", () => {
  it("renders the standard form correctly", () => {
    const mailForm = render(<WriteMailForm />);
    expect(
      mailForm.getByPlaceholderText("Write your letter")
    ).toBeInTheDocument();
  });

  it("renders the reply letter form variation", () => {
    const mailForm = render(<WriteMailForm isReplyLetter={true} />);
    expect(
      mailForm.getByPlaceholderText("Write your reply letter")
    ).toBeInTheDocument();
  });

  it("onchange", () => {
    const mailForm = render(<WriteMailForm />);
    const formTextarea = mailForm.getByPlaceholderText("Write your letter");

    function handleOnChange(event) {
      return event.target.value;
    }

    fireEvent.change(formTextarea, { target: { value: "a" } });
    expect(formTextarea.handleOnChange).toHaveBeenCalledTimes(1);
  });
});
