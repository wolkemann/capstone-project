import styled from "styled-components";
import { Button } from "../../components/Button/Button";
import WriteMailForm from "../../components/WriteMailForm/WriteMailForm";

export default function Home() {
  return (
    <Wrapper>
      <h1>Write Mail</h1>
      <WriteMailForm />
    </Wrapper>
  );
}

const Wrapper = styled.main`
  margin: 1rem;
`;
