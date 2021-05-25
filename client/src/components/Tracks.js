import React, { useEffect, useState } from "react";
import { getTopTracks } from "../spotify/index";
import { Loader } from "./Loader";

import styled from "styled-components";

import { TrackItem } from "./TrackItem";

const Header = styled.header`
  ${({ theme }) => theme.mixins.flexBetween};
  margin-bottom: 50px;
  @media screen and (max-width: 780px) {
    flex-direction: column;
    text-align: center;
    ul {
      font-size: var(--fz-xxs);
      margin-top: 15px;
    }
  }
  ul {
    display: flex;
    color: grey;
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

const Tracklist = styled.div`
  @media screen and (max-width: 1080px) {
    padding: 0 50px;
  }
  @media screen and (max-width: 480px) {
    padding: 0px 20px;
  }
`;

export const Tracks = () => {
  const [timeRange, setTimeRange] = useState("long_term");
  const [topTracks, setTopTracks] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let { data } = await getTopTracks(timeRange);
      setTopTracks(data);
    };
    fetchData().catch((err) => console.error(err));
  }, [timeRange]);

  return (
    <div className="main-view">
      <Header>
        <h1>Favourite tracks</h1>
        <ul>
          <li
            onClick={() => setTimeRange("long_term")}
            className={timeRange === "long_term" ? "isActive" : ""}
          >
            All time
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
      {topTracks ? (
        <Tracklist>
          {topTracks.items &&
            topTracks.items.map((track) => <TrackItem track={track} />)}
        </Tracklist>
      ) : (
        <Loader />
      )}
    </div>
  );
};
