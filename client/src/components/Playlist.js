import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getPlaylist } from "../spotify";
import { TrackItem } from "./TrackItem";
import { Loader } from "./Loader";
import { Link } from "react-router-dom";
import placeHolderCover from "../images/album-placeholder.png";

export const PlaylistContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(200px, 35%) 1fr;
  grid-column-gap: 50px;
  text-align: center;

  @media screen and (max-width: 780px) {
    grid-template-columns: 1fr;
  }

  h1 {
    font-size: var(--fz-xl);
    margin-top: 15px;
  }

  p {
    color: grey;
    font-size: var(--fz-xs);
    font-weight: 100;
    margin-top: 10px;
  }
  ul {
    position: relative;
    top: -25px;
  }

  header {
    width: 100%;
    margin-bottom: 25px;

    a {
      ${({ theme }) => theme.mixins.button}
      margin-top:25px
    }
  }

  .cover-container {
    width: 100%;
    min-width: 200px;
    max-width: 300px;
    height: auto;
    object-fit: contain;
    overflow: hidden;
    margin: 0 auto;
    img {
      width: 100%;
    }
    @media screen and (max-width: 780px) {
      img {
        display: none;
      }
    }
  }
`;

export const Playlist = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getPlaylist(playlistId);
      setPlaylist(data);
    };
    fetchData().catch((err) => console.error(err));
  }, [playlistId]);

  const coverUrl =
    playlist && playlist.images.length !== 0
      ? playlist.images[0].url
      : placeHolderCover;

  return (
    <div className="main-view">
      {playlist ? (
        <PlaylistContainer>
          <header>
            <div className="cover-container">
              <img src={coverUrl} alt="album cover" />
            </div>
            <h1>{playlist.name}</h1>
            <p>By {playlist.owner.display_name}</p>
            <p>{playlist.description}</p>
            <p>{playlist.tracks.total} tracks</p>
            <Link to={`/recommendations/${playlist.id}`}>
              GET RECOMMENDATIONS
            </Link>
          </header>
          <ul>
            {playlist.tracks.items.map((track, i) => (
              <TrackItem track={track.track} key={track.track.id} />
            ))}
          </ul>
        </PlaylistContainer>
      ) : (
        <Loader />
      )}
    </div>
  );
};
