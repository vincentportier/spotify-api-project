import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { shuffle } from "../utils/index";
import {
  getPlaylist,
  getTracksRecommendation,
  getUser,
  createPlaylist,
  addTracksToPlaylist,
} from "../spotify";
import { TrackItem } from "./TrackItem";
import { Loader } from "./Loader";
import styled from "styled-components";

const RecommendationsContainer = styled.div`
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 25px;

    @media screen and (max-width: 780px) {
      text-align: center;
      flex-direction: column;
      align-items: center;

      a {
        margin-top: 20px;
      }
    }
    .playlist-name {
      font-style: italic;
    }
    h1 {
      font-size: var(--fz-lg);
    }
  }
`;

const SaveButton = styled.button`
  margin-left: 50px;
  display: inline-block;
  text-align: center;
  font-size: var(--fz-xxs);
  color: var(--white);
  background: var(--primary);
  padding: 10px 20px;
  border-radius: 30px;

  border: none;
  cursor: pointer;
`;

export const Recommendations = ({ tracks }) => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getUser();
      setUser(data);
    };
    fetchData().catch((err) => console.error(err));
  }, []);

  // get the playlist data
  useEffect(() => {
    const fetchData = async () => {
      let { data } = await getPlaylist(playlistId);
      setPlaylist(data);
    };
    fetchData().catch((err) => console.error(err));
  }, [playlistId]);

  // get recommendations when playlist is defined
  useEffect(() => {
    let fetchData = async (seed) => {
      let { data } = await getTracksRecommendation(seed);
      setRecommendation(data.tracks);
    };

    let seed = [];

    if (playlist) {
      playlist.tracks.items.forEach((track) => seed.push(track.track.id));
      seed = shuffle(seed).slice(0, 5);
      seed = seed.join(",");
      fetchData(seed).catch((err) => console.error(err));
    }
  }, [playlist]);

  const savePlaylist = () => {
    if (!user) return;
    let id = user.id;
    let name = `Recommended tracks based on ${playlist.name}`;
    let uris = [];

    if (!recommendation) return;

    recommendation.forEach((track) => uris.push(track.uri));

    const create = async () => {
      const { data } = await createPlaylist(name, id);
      return data.id;
    };

    const addTracks = async (playlistId, uris) => {
      await addTracksToPlaylist(playlistId, uris);
      return playlistId;
    };

    create()
      .then((id) => {
        addTracks(id, uris).then((id) => {
          window.history.replaceState({}, name, `/playlist/${id}`);
          window.location.reload();
        });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="main-view">
      {playlist ? (
        <RecommendationsContainer>
          <header>
            <h1>
              Recommended tracks based on{" "}
              <span className="playlist-name">
                {playlist.name[0].toUpperCase() + playlist.name.slice(1)}:
              </span>
            </h1>
            {user && (
              <SaveButton
                onClick={() => {
                  savePlaylist();
                }}
              >
                SAVE TO SPOTIFY
              </SaveButton>
            )}
          </header>
          <div>
            {recommendation &&
              recommendation.map((track) => (
                <TrackItem track={track} key={track.id} />
              ))}
          </div>
        </RecommendationsContainer>
      ) : (
        <Loader />
      )}
    </div>
  );
};
