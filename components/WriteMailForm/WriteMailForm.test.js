import React from "react";
import WriteMailForm from "./WriteMailForm";
import { render, fireEvent, screen } from "@testing-library/react";

describe("Write mail Form component testing", () => {
  it("renders the standard form correctly", () => {
    render(<WriteMailForm />);
    expect(
      screen.getByPlaceholderText("Write your letter")
    ).toBeInTheDocument();
  });

  it("renders the reply letter form variation", () => {
    render(<WriteMailForm isReplyLetter={true} />);
    expect(
      screen.getByPlaceholderText("Write your reply letter")
    ).toBeInTheDocument();
  });

  it("changes the input on change", () => {
    render(<WriteMailForm />);
    const formTextarea = screen.getByRole("textbox");

    expect(formTextarea).toBeInTheDocument();

    fireEvent.change(formTextarea, {
      target: { value: "A testing letter text" },
    });
    expect(formTextarea.value).toBe("A testing letter text");
  });

  it("calls the handleSubmit function when the submit button is pushed", () => {
    const testSubmit = jest.fn();

    render(<WriteMailForm handleSubmit={testSubmit} />);
    const submitButton = screen.getByRole("button");

    fireEvent.click(submitButton);

    expect(testSubmit).toHaveBeenCalledTimes(1);
  });

  it("calls the handleSubmit function when the submit button is pushed", () => {
    const testSubmit = jest.fn((event) => {
      event.preventDefault();
      return "to replace when the code works";
    });

    render(<WriteMailForm handleSubmit={testSubmit} />);

    const formTextarea = screen.getByRole("textbox");
    const submitButton = screen.getByRole("button");

    fireEvent.change(formTextarea, {
      target: { value: "A testing letter text" },
    });

    fireEvent.click(submitButton);

    expect(testSubmit).toHaveBeenCalledWith("A testing letter text");
  });
});
