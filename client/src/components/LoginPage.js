import React from "react";
import styled from "styled-components";

const LOGIN_URI =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8888/login"
    : "https://spoti-profile.herokuapp.com/login";

const StyledLoginPage = styled.main`
  width: 100%;
  height: 100vh;
  background-color: var(--charcoal);
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: center;
  .app-title-container {
    ${({ theme }) => theme.mixins.flexCenter}
    margin-bottom:30px;
    text-align: center;
    h1 {
      color: var(--white);
    }

    svg {
      width: 40px;
    }
  }
`;

const StyledLoginButton = styled.a`
  color: var(--white);
  font-weight: 700;
  font-size: var(--fz-md);
  text-decoration: none;
  padding: 15px 40px;
  border-radius: 25px;
  background-color: var(--primary);
  cursor: pointer;
  :hover {
    background: var(--primary-hover);
  }
`;

const Disclaimer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  color: var(--white);
  padding: 0 15px;
  span {
    font-weight: 900;
    font-size: var(--fz-lg);
    color: var(--primary);
  }
  div {
    margin-top: 15px;
    p {
      margin-bottom: 10px;
    }
  }
`;

export const LoginPage = () => {
  return (
    <StyledLoginPage>
      <div className="app-title-container">
        <h1>Spotify Profile</h1>
      </div>

      <StyledLoginButton href={LOGIN_URI}>Login to Spotify</StyledLoginButton>
      <Disclaimer>
        <p>
          If you do not want to use your Spotify account, you can use this dummy
          account to login
        </p>
        <div>
          <p>
            <span>Username:</span> dumyspotify@gmail.com
          </p>
          <p>
            <span>Password:</span> test123!
          </p>
        </div>
      </Disclaimer>
    </StyledLoginPage>
  );
};
