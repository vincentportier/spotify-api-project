import React, { useEffect, useState } from "react";
import { getTopArtists } from "../spotify/index";
import { Loader } from "./Loader";
import { parseFollowerCount } from "../utils/index";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = styled.header`
  ${({ theme }) => theme.mixins.flexBetween};
  @media screen and (max-width: 1080px) {
    flex-direction: column;
  }
  ul {
    display: flex;
    color: grey;
    @media screen and (max-width: 1080px) {
      margin-top: 15px;
    }
    @media screen and (max-width: 780px) {
      font-size: var(--fz-xxs);
      flex-wrap: wrap;
      justify-content: center;
      text-align: center;

      li {
        margin-bottom: 10px;
      }
    }
    li {
      margin-left: 15px;
      cursor: pointer;
    }
    .isActive {
      font-weight: bold;
      border-bottom: solid 1px;
      padding-bottom: 2px;
      color: var(--white);
    }
  }
`;

export const ArtistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-auto-flow: row;
  grid-row-gap: 25px;
  grid-column-gap: 25px;
  width: 100%;
  margin-top: 50px;
  .artist-container {
    width: 100px;
    text-align: center;
    margin: 0 auto;

    &.isHovered {
      img {
        opacity: 35%;
        filter: blur(1px);
      }
    }
  }

  .name {
    font-size: var(--fz-xs);
    margin-top: 10px;
  }

  .followers {
    font-size: var(--fz-xxs);
    font-weight: 100;
    margin-top: 5px;
  }
  .avatar {
    width: 100px;
    height: 100px;
    object-fit: contain;
    border-radius: 50%;
    overflow: hidden;
    position: relative;

    div {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      color: black;
      font-weight: 900;
      border-radius: 50%;
      width: 25px;
      height: 25px;
    }

    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }
`;

export const Artists = () => {
  const [timeRange, setTimeRange] = useState("following");
  const [artists, setArtists] = useState(null);
  const [isHovered, setIsHovered] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let { data } = await getTopArtists(timeRange);
      timeRange === "following"
        ? setArtists(data.artists.items)
        : setArtists(data.items);
    };
    fetchData().catch((err) => console.error(err));
  }, [timeRange]);

  return (
    <div className="main-view">
      <Header>
        <h1>Artists</h1>
        <ul>
          <li
            onClick={() => setTimeRange("following")}
            className={timeRange === "following" ? "isActive" : ""}
          >
            Following
          </li>
          <li
            onClick={() => setTimeRange("long_term")}
            className={timeRange === "long_term" ? "isActive" : ""}
          >
            All time favourites
          </li>
          <li
            onClick={() => setTimeRange("medium_term")}
            className={timeRange === "medium_term" ? "isActive" : ""}
          >
            Last 6 months
          </li>
          <li
            onClick={() => setTimeRange("short_term")}
            className={timeRange === "short_term" ? "isActive" : ""}
          >
            Last 4 weeks
          </li>
        </ul>
      </Header>
      {artists ? (
        <ArtistGrid>
          {artists.map((artist, i) => (
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
                <p className="followers">
                  {parseFollowerCount(artist.followers.total)} Followers
                </p>
              </div>
            </Link>
          ))}
        </ArtistGrid>
      ) : (
        <Loader />
      )}
    </div>
  );
};
