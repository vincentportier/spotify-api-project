import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import { LoginPage } from "./LoginPage";
import { Dashboard } from "./Dashboard";
import { GlobalStyle } from "../styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";
import { token } from "../spotify";

const App = () => {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    setAccessToken(token);
  }, []);

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <div className="app-wrapper">
          {accessToken ? <Dashboard /> : <LoginPage />}
        </div>
      </ThemeProvider>
    </Fragment>
  );
};

export default App;
