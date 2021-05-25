import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Loader } from "./Loader";
import styled from "styled-components";
import { getTrackInfo } from "../spotify/index";
import { AudioFeaturesChart } from "./AudioFeaturesChart";
import { Link } from "react-router-dom";

const Header = styled.header`
  display: flex;
  @media screen and (max-width: 780px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const Cover = styled.div`
  width: 100%;
  max-width: 300px;
  max-height: 300px;
  object-fit: contain;
  overflow: hidden;
  margin-bottom: 25px;
  img {
    width: 100%;
    height: auto;
  }
`;

const PlayButton = styled.a`
  ${({ theme }) => theme.mixins.button};
  margin-top: 25px;
`;

const TrackInfo = styled.div`
  margin-left: 30px;
  @media screen and (max-width: 780px) {
    margin: 0;
  }
  h1 {
    font-size: 40px;
    margin-bottom: 12px;
    font-weight: bold;
  }

  .artist-link {
    font-size: var(--fz-xxl);
    transition: all 0.2s ease-in;

    &:hover {
      text-decoration: underline;
      color: var(--primary);
    }
  }

  p {
    font-size: var(--fz-lg);
    color: gray;
    margin-bottom: 10px;
  }
`;

const ChartWrapper = styled.div``;

export const Track = (props) => {
  const [track, setTrack] = useState(null);
  const [audioFeatures, setAudioFeatures] = useState(null);

  let { trackId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTrackInfo(trackId);
      setTrack(data.track);
      setAudioFeatures(data.audioFeatures);
    };
    fetchData().catch((err) => console.error(err));
  }, []);

  return (
    <div className="main-view">
      {!track ? (
        <Loader />
      ) : (
        <div>
          <Header>
            <Cover>
              <img src={track.album.images[1].url} />
            </Cover>
            <TrackInfo>
              <h1>{track.name}</h1>

              {track.artists.map((artist, i, arr) => (
                <Link to={`/artist/${artist.id}`} className="artist-link">
                  {i === arr.length - 1 ? (
                    <span>{artist.name}</span>
                  ) : (
                    <span style={{ marginRight: "10px" }}>{artist.name},</span>
                  )}
                </Link>
              ))}

              <p>
                {track.album.name} - {track.album.release_date.substring(0, 4)}
              </p>

              <PlayButton
                href={`https://open.spotify.com/track/${trackId}`}
                target="_blank"
              >
                PLAY ON SPOTIFY
              </PlayButton>
            </TrackInfo>
          </Header>
        </div>
      )}
    </div>
  );
};
