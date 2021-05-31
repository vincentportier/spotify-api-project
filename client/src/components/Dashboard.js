import React from "react";

import { Nav } from "./Nav";
import { Recent } from "./Recent";
import { Tracks } from "./Tracks";
import { Track } from "./Track";
import { Artists } from "./Artists";
import { Profile } from "./Profile";
import { Playlists } from "./Playlists";
import { Artist } from "./Artist";
import { Playlist } from "./Playlist";
import { Recommendations } from "./Recommendations";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export const Dashboard = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/artists">
          <Artists />
        </Route>
        <Route path="/artist/:artistId">
          <Artist />
        </Route>
        <Route path="/playlists">
          <Playlists />
        </Route>
        <Route path="/playlist/:playlistId">
          <Playlist />
        </Route>
        <Route path="/recent">
          <Recent />
        </Route>
        <Route path="/tracks">
          <Tracks />
        </Route>
        <Route path="/track/:trackId">
          <Track />
        </Route>
        <Route path="/recommendations/:playlistId">
          <Recommendations />
        </Route>
        <Route path="/">
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
};
