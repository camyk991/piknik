import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --blackText: #272727;
    --maxWidth: 1140px;
    --yellow: #FFE600;
    --blue: #DCF0F2;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Lexend', sans-serif;
    font-size: 14px;
    line-height: 17px;
  }

`