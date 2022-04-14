/* ==========================

Importing Libraries

============================*/
import Link from "next/link";
import styled from "styled-components";
/* ==========================

Importing App Components

============================*/
import { Button } from "../Button/Button";

export default function LandingPage() {
  return (
    <>
      <Article>
        <H2>About Gentle Letters</H2>
        <p>
          Today is all about Facebook, Instagram and TikTok. But these Socials
          are just huge shopping malls where people only showcase their best
          goods, the &quot;very best of&quot; of their lives.
        </p>
        <p>
          Real life is made of ups and downs, and when you are forced by
          competition to show only the best of you, then the best of you becomes
          a manufactured, artificial thing, very far from reality.
        </p>
        <p>
          Sometimes we need a relaxing place where we can talk about everything
          without the fear of social pressure, without filters and with someone
          willing to listen to us.
        </p>
        <p>
          This is the reason behind <strong>Gentle Letters</strong>.
        </p>
      </Article>
      <Article>
        <H2>How it works?</H2>
        <H3>Anonymous Enviroment</H3>
        <p>
          <strong>Gentle Letters</strong> should be a place where people can
          relax and talk freely. To achieve this, the best way to do this is
          through a place where a person can be a nickname and nothing else.
        </p>
        <p>
          To avoid the occurrence of someone using a name that could exactly
          identify them, a random nickname will be assigned the first time
          someone signs in.
        </p>
        <p>
          The nickname generation process follows this pattern: adjective_animal
          (i.e. laughing_octopus)
        </p>
        <H3>Writing Letters and Replies</H3>
        <p>
          Whenever you want to express a thought and share it with someone else,
          you can write a Letter and send it around.
        </p>
        <p>
          The Letter is then received by a random member who can interact with
          you by sending you a reply letter. in this way you will always receive
          help from different people, a bit like talking to a stranger on a long
          journey.
        </p>
        <H3>Sending Stickers</H3>
        <p>
          As a token of appreciation for the kind words you received, you can
          send a sticker to the person who welcomed your letter and decided to
          be so kind to help you.
        </p>
        <Link href="/signin/#top">
          <a style={{ textDecoration: "none" }}>
            <BigButton>
              Intrigued?
              <br />
              Register now!
            </BigButton>
          </a>
        </Link>
      </Article>
    </>
  );
}

const H2 = styled.h2`
  text-align: center;
  margin: 2rem 0;
  text-shadow: 5px 5px rgba(78, 10, 71, 0.57);
  font-size: 2.5em;
  @media (min-width: 800px) {
    font-size: 3.5em;
  }
`;

const H3 = styled.h3`
  text-align: center;
  font-weight: normal;
  margin: 3rem 0;
  font-style: italic;
  font-size: 1.5em;
  @media (min-width: 800px) {
    font-size: 2em;
  }
`;

const Article = styled.article`
  font-size: 1.2em;
  color: #f6c9f1;
  margin: 0;
  min-height: 100vh;
  & p {
    margin: 1.5rem 0;
    @media (min-width: 800px) {
      font-weight: 300;
      font-size: 1.5em;
    }
  }
`;

const BoxWrapper = styled.article`
  margin: 1rem 0;
  padding: 0rem;
  & p {
    margin: 1.5rem 0;
  }
`;

const BigButton = styled(Button)`
  font-size: 1.5em;
  padding: 1.5rem 0rem;
  width: 100%;
`;
