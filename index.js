const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path");
const request = require("request");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const querystring = require("querystring");
const { access } = require("fs");

const PORT = process.env.PORT || 8888;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
let redirect_uri = process.env.REDIRECT_URI || "http://localhost:8888/callback";
let FRONTEND_URI = process.env.FRONTEND_URI || "http://localhost:3000";

if (process.env.NODE_ENV !== "production") {
  redirect_uri = "http://localhost:8888/callback";
  FRONTEND_URI = "http://localhost:3000";
}

const generateRandomString = (length) => {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

let stateKey = "spotify_auth_state";

app
  .use(express.static(path.join(__dirname, "client/build")))
  .use(cors())
  .use(cookieParser());

app.get("/login", (req, res) => {
  let state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  let scope =
    "user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private";

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
});

app.get("/callback", (req, res) => {
  let code = req.query.code || null;
  let state = req.query.state || null;

  let storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      `/#` +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    res.clearCookie(stateKey);

    let authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirect_uri,
      },
      headers: {
        Authorization:
          `Basic ` +
          new Buffer(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        let access_token = body.access_token;
        let refresh_token = body.refresh_token;

        res.redirect(
          FRONTEND_URI +
            "/#" +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token,
            })
        );
      } else {
        res.redirect(
          FRONTEND_URI +
            "/#" +
            querystring.stringify({ error: "invalid_token" })
        );
      }
    });
  }
});

app.get("/refresh_token", (req, res) => {
  console.log("I have triggered the refresh");

  const refresh_token = req.query.refresh_token;

  let authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      grant_type: "refresh_token",
      refresh_token,
    },
    headers: {
      Authorization:
        `Basic ` +
        new Buffer(client_id + ":" + client_secret).toString("base64"),
    },
    json: true,
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      res.send({ access_token });
    }
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`app listening on port http://localhost:${PORT}`);
});
