import styled from "styled-components";
import Link from "next/link";
import useSWR from "swr";
import bcrypt from "bcryptjs";
import { useState } from "react";
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from "unique-names-generator";

import Windowr from "../components/Windowr/Windowr";
import { Input } from "../components/Input/Input.js";
import { Button } from "../components/Button/Button";
import Navigation from "../components/Navigation/Navigation";

export default function CreateAccount() {
  const [submitState, setSubmitState] = useState("idle");
  const [formError, setFormError] = useState("");
  const [createdUsername, setcreatedUsername] = useState("");
  const users = useSWR("/api/create-account");

  async function handleSubmit(event) {
    event.preventDefault();

    // We check if the two password have the same value
    if (event.target.password.value === event.target.confirmpassword.value) {
      // We create a random nickname
      const shortName = uniqueNamesGenerator({
        dictionaries: [adjectives, animals],
        length: 2,
      });

      console.log(shortName);

      const hashedPassword = bcrypt.hashSync(event.target.password.value, 10);
      const cleanPassword = bcrypt.compareSync(
        event.target.password.value,
        hashedPassword
      );

      const response = await fetch("/api/create-account", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: event.target.email.value,
          password: hashedPassword,
          nickname: shortName,
        }),
      });
      const createdUser = await response.json();
      if (response.ok) {
        users.mutate();
        setSubmitState("success");
        setcreatedUsername(shortName);
      } else {
      }
    } else {
      // if the two passwords fields are not the same, then the error is shown
      setFormError("The two passwords don't match!");
    }
  }

  switch (submitState) {
    case "success":
      return (
        <main>
          <Windowr>
            <h2>Account created!</h2>
            <p>
              The nickname <strong>{createdUsername}</strong> has been assigned
              to you.
            </p>
          </Windowr>
        </main>
      );
    default:
      return (
        <main>
          <Windowr>
            <h2>Create Account</h2>
            <Form onSubmit={handleSubmit}>
              <label htmlFor="email">E-mail</label>
              <Input type="email" id="email" name="email" required></Input>
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                id="password"
                name="password"
                required
              ></Input>
              <Input
                type="password"
                id="confirmpassword"
                name="confirmpassword"
                placeholder="confirm password"
                required
              ></Input>
              <Button>Create account</Button>
              <p>{formError}</p>
            </Form>
          </Windowr>
        </main>
      );
  }
}

const Form = styled.form`
  margin: 1rem 0;
  margin-bottom: 0;
  display: flex;
  flex-flow: column wrap;
  & > input {
    margin: 0.2rem 0;
  }
  & > label {
    margin: 0.5rem 0;
  }
  & > button {
    margin: 0.5rem 0;
  }
`;
