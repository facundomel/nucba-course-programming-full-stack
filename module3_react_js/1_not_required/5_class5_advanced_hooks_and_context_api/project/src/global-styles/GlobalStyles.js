import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0;
      padding: 0;
      background-color: #191919;
      width: 100vw;
      height: 100vh;
    }
`;
export default GlobalStyles;
