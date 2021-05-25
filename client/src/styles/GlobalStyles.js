import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

:root {
    ${({ theme }) => theme.palette}
    ${({ theme }) => theme.fontSizes}
    }
    * {
        margin:0;
        padding:0;
        box-sizing:border-box;
        font-family:Arial, Helvetica, sans-serif;
    }

// remove the browser bounce 

    /* html, body {
    height: 100%;
    overflow: hidden;
}

    .app-wrapper {position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
    } */


.main-view {
  position:absolute;
  top:0;
  left:150px;
  overflow-y:hidden;
  width:calc(100vw - 150px);
  padding: 80px 50px;
  background: #121216; 
  color: var(--white);
  min-height: 100vh;
  border-left: 1px solid #32323d;

  @media screen and (max-width:1080px) {
      width:100vw;
      left:0;
      border-left:none;
      min-height:calc(100vh - 75px);
      padding:80px 20px 125px 20px;
  }
}


a { 

   display: inline-block;
    text-decoration: none;
    color: inherit;
    cursor: pointer;    
}

li {
    list-style:none;
}


`;
