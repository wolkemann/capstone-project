import Link from "next/link";
import styled from "styled-components";
import { Input } from "../components/Input/Input";
import Navigation from "../components/Navigation/Navigation";
import Windowr from "../components/Windowr/Windowr";
import { Button } from "../components/Button/Button";

export default function Home() {
  return (
    <main>
      <Windowr>login</Windowr>

      <Windowr>
        <Input type="text" id="email" name="email" placeholder="email" />
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="password"
        />
        <Button>login</Button>
        <Navigation />
      </Windowr>
    </main>
  );
}
