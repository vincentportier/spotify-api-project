import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  IconMusic,
  IconPlaylists,
  IconUser,
  IconTime,
  IconMicrophone,
  IconGithub,
} from "./icons/index";

const StyledNav = styled.nav`
  position: fixed;
  background: #191922;
  width: 150px;
  height: 100vh;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  text-align: center;
  z-index: 99;

  @media screen and (max-width: 1080px) {
    top: auto;
    bottom: 0;
    width: 100vw;
    height: 75px;
  }
`;

const Github = styled.div`
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translate(-50%, -50%);

  svg {
    fill: grey;
    width: 30px;
    height: 30px;
    &:hover {
      fill: var(--white);
    }

    @media screen and (max-width: 1080px) {
      display: none;
    }
  }
`;

const Menu = styled.ul`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1080px) {
    flex-direction: row;
    margin: 0 auto;
    width: 100%;
    justify-content: space-between;
  }
`;

const MenuItem = styled.li`
  color: var(--white);
  font-size: 11px;
  width: 150px;
  a {
    display: block;
    padding: 15px 0;
    border-left: 5px solid transparent;
    width: 100%;
    height: 100%;
    &:hover,
    &:focus,
    &.active {
      color: var(--primary);
      background-color: var(--charcoal);
      border-left: 5px solid var(--primary);
      svg {
        fill: var(--primary);
      }
    }

    @media screen and (max-width: 1080px) {
      &:hover,
      &:focus,
      &.active {
        border-top: 5px solid var(--primary);
        border-left: none;
      }
    }
  }
  svg {
    fill: var(--white);
    width: 20px;
    height: 20px;
    margin-bottom: 7px;
  }
`;

const NavLink = (props) => <Link activeclassname="active" {...props} />;

export const Nav = () => {
  return (
    <div>
      <StyledNav>
        <Menu>
          <MenuItem>
            <NavLink to="/">
              <IconUser />
              <div>Profile</div>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/artists">
              <IconMicrophone />
              <div>Artists</div>
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to="/tracks">
              <IconMusic />
              <div>Tracks</div>
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to="/recent">
              <IconTime />
              <div>Recent</div>
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to="/playlists">
              <IconPlaylists />
              <div>Playlists</div>
            </NavLink>
          </MenuItem>
        </Menu>
        <Github>
          <a
            href="https://github.com/vincentportier/spotify-api-project"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconGithub />
          </a>
        </Github>
      </StyledNav>
    </div>
  );
};
