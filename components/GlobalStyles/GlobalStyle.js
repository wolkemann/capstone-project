import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    --text-color: #6926A9;
    --main-background-color: #F6C9F1;
    --window-background-color: #b4e0fa;
    --window-border-color: #877bf4;
    --button-text-color: #F6C9F1;
    --button-border-color: #584DC0;
    --button-background-color: #7D65C9;
  }
  body {
    font-family: 'Source Sans Pro', sans-serif;
    background: hsla(257, 47%, 61%, 1);
    background: linear-gradient(180deg, hsla(257, 47%, 61%, 1) 0%, hsla(247, 53%, 56%, 1) 100%);
    background: -moz-linear-gradient(180deg, hsla(257, 47%, 61%, 1) 0%, hsla(247, 53%, 56%, 1) 100%);
    background: -webkit-linear-gradient(180deg, hsla(257, 47%, 61%, 1) 0%, hsla(247, 53%, 56%, 1) 100%);
    color: var(--text-color);
  }
  main {
    margin: 0.5rem;
    margin-bottom: 77px;
  }
  textarea, input[type='button'] {
    font-family: 'Source Sans Pro', sans-serif;
  }
`;
