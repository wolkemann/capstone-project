import styled from "styled-components";
import WriteMailForm from "../../components/WriteMailForm/WriteMailForm";

export default function Home() {
  function handleSubmit(event) {
    event.preventDefault();
    console.log("davai");
  }
  return (
    <Wrapper>
      <WriteMailForm handleSubmit={handleSubmit} />
    </Wrapper>
  );
}

const Wrapper = styled.main`
  margin: 1rem;
`;
