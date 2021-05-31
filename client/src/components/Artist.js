import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getArtistInfo } from "../spotify/index";
import { TrackItem } from "./TrackItem";
import { parseFollowerCount, scrollToTop } from "../utils/index";
import { Loader } from "./Loader";
import styled from "styled-components";
import { ArtistGrid } from "./Artists";
import { Link } from "react-router-dom";

const Avatar = styled.div`
  margin: 0 auto;
  width: 250px;
  height: 250px;
  box-sizing: border-box;
  object-fit: contain;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const ArtistContainer = styled.div`
  text-align: center;
  h1 {
    margin: 25px 0;
    font-size: 55px;
    font-weight: 900;
    &:hover {
      color: var(--primary);
    }
  }
  h2 {
    text-align: left;
  }
`;

const TopTracks = styled.div`
  margin-top: 50px;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      ${({ theme }) => theme.mixins.button}
      display:flex;
      align-items: center;
      background: transparent;
      color: white;
      border: 1px solid white;
      transition: all 0.2s ease-in;

      &:hover {
        background: var(--white);
        color: var(--charcoal);
        border-color: transparent;
        cursor: pointer;
      }
    }
  }
`;

const SimilarArtists = styled.div`
  margin-top: 50px;
`;

const Stats = styled.div`
  display: flex;
  justify-content: center;
  color: var(--white);
  align-items: center;
`;

const StatItem = styled.div`
  text-align: center;
  font-weight: 400;
  font-size: var(--fz-lg);
  color: var(--primary);
  margin: 0px 40px;
  font-weight: 900;

  li {
    margin: 8px 0px;
  }

  .title {
    color: grey;
    font-weight: 100;
    font-size: var(--fz-xxs);
    margin-top: 10px;
  }
`;

export const Artist = () => {
  const [artist, setArtist] = useState(null);
  const [topTracks, setTopTracks] = useState(null);
  const [similarArtists, setSimilarArtists] = useState(null);
  const [showTopTracks, setShowTopTracks] = useState(false);
  const [isHovered, setIsHovered] = useState(null);
  const { artistId } = useParams();

  useEffect(() => {
    scrollToTop();
    setShowTopTracks(false);
    const fetchData = async () => {
      const { artist, topTracks, similarArtists } = await getArtistInfo(
        artistId
      );
      setArtist(artist);
      setTopTracks(topTracks);
      setSimilarArtists(similarArtists);
    };
    fetchData().catch((err) => console.error(err));
  }, [artistId]);

  return (
    <div className="main-view">
      {artist ? (
        <ArtistContainer>
          <Avatar>
            <img
              src={artist.images[0].url}
              alt={`${artist.name} portrait`}
            ></img>
          </Avatar>
          <a
            href={artist.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h1>{artist.name}</h1>
          </a>
          <Stats>
            <StatItem>
              <p>{parseFollowerCount(artist.followers.total)}</p>
              <p className="title">FOLLOWERS</p>
            </StatItem>
            <StatItem>
              <ul>
                {artist.genres &&
                  artist.genres
                    .slice(0, 4)
                    .map((genre, i) => (
                      <li key={i}>
                        {genre[0].toUpperCase() + genre.substring(1)}
                      </li>
                    ))}
              </ul>
              <p className="title">GENRES</p>
            </StatItem>
            <StatItem>
              <p>{`${artist.popularity}%`}</p>
              <p className="title">POPULARITY</p>
            </StatItem>
          </Stats>

          <TopTracks>
            <header>
              <h2>Top tracks</h2>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowTopTracks(!showTopTracks);
                }}
                className="toggle-button"
              >
                {showTopTracks ? "SHOW LESS" : "SHOW MORE"}
              </button>
            </header>
            {topTracks && (
              <div>
                {!showTopTracks
                  ? topTracks
                      .slice(0, 3)
                      .map((track) => (
                        <TrackItem track={track} key={track.id} />
                      ))
                  : topTracks.map((track) => (
                      <TrackItem track={track} key={track.id} />
                    ))}
              </div>
            )}
          </TopTracks>
          <SimilarArtists>
            <h2>Fans also like</h2>
            <ArtistGrid>
              {similarArtists &&
                similarArtists.slice(0, 8).map((artist, i) => {
                  return (
                    <Link
                      to={`/artist/${artist.id}`}
                      key={artist.id}
                      onMouseEnter={() => setIsHovered(i)}
                      onMouseLeave={() => setIsHovered(null)}
                    >
                      <div
                        className={
                          isHovered === i
                            ? "artist-container isHovered"
                            : "artist-container"
                        }
                      >
                        <div className="avatar">
                          <img
                            src={artist.images && artist.images[0].url}
                            alt={`${artist.name} portrait`}
                          ></img>
                          {isHovered === i && <div className="info">i</div>}
                        </div>
                        <h1 className="name">{artist.name}</h1>
                      </div>
                    </Link>
                  );
                })}
            </ArtistGrid>
          </SimilarArtists>
        </ArtistContainer>
      ) : (
        <Loader />
      )}
    </div>
  );
};
