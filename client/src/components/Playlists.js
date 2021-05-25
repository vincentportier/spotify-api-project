import React, { useEffect, useState } from "react";
import { getPlaylists } from "../spotify/index";
import { Loader } from "./Loader";
import styled from "styled-components";
import { Link } from "react-router-dom";
import placeholderImage from "../images/album-placeholder.png";

const Header = styled.div`
  @media screen and (max-width: 780px) {
    text-align: center;
  }
`;
const PlaylistsGrid = styled.div`
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  column-gap: 25px;
  row-gap: 25px;
`;

const PlaylistItem = styled(Link)`
  text-align: center;

  .cover-container {
    width: 200px;
    height: 200px;
    object-fit: contain;
    overflow: hidden;
    margin: 0 auto;

    img {
      width: 100%;
      height: 100%;
    }
  }

  h2 {
    font-size: var(--fz-md);
    margin: 15px 0 3px;
  }
  p {
    font-size: var(--fz-xs);
    font-weight: 100;
    color: grey;
  }

  @media screen and (max-width: 780px) {
    h2 {
      font-size: var(--fz-sm);
    }
  }
  @media screen and (max-width: 480px) {
    h2 {
      font-size: var(--fz-xs);
    }
  }
`;

export const Playlists = () => {
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getPlaylists();
      setPlaylists(data.items);
    };
    fetchData().catch((err) => console.error(err));
  }, []);

  return (
    <div className="main-view">
      <Header>
        <h1>Playlists</h1>
      </Header>
      {playlists ? (
        <PlaylistsGrid>
          {playlists.map((playlist) => (
            <PlaylistItem to={`/playlist/${playlist.id}`}>
              <div className="cover-container">
                <img
                  src={
                    playlist.images.length !== 0
                      ? playlist.images[0].url
                      : placeholderImage
                  }
                />
              </div>
              <h2>{playlist.name}</h2>
              <p>{playlist.tracks.total} tracks</p>
            </PlaylistItem>
          ))}
        </PlaylistsGrid>
      ) : (
        <Loader />
      )}
    </div>
  );
};
