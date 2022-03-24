import styled from "styled-components";
import WriteMailForm from "../../components/WriteMailForm/WriteMailForm";

export default function Home() {
  return (
    <Wrapper>
      <WriteMailForm />
    </Wrapper>
  );
}

const Wrapper = styled.main`
  margin: 1rem;
`;
