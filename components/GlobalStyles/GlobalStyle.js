import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    --text-color: #6926A9;
    --window-background-color: #b4e0fa;
    --button-text-color: #F6C9F1;
    --button-border-color: #584DC0;
    --button-background-color: #7D65C9;
  }
  body {
    background-color: #F6C9F1;
    color: var(--text-color);
  }
`;
