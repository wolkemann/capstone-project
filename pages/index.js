import Link from "next/link";
import styled from "styled-components";
import Navigation from "../components/Navigation/Navigation";

export default function Home() {
  return (
    <main>
      <h1>
        <Link href="/send/">
          <a>dava</a>
        </Link>
      </h1>
      <Navigation />
    </main>
  );
}
