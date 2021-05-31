import React, { useEffect, useState } from "react";
import { getRecentlyPlayed } from "../spotify/index";
import { TrackItem } from "./TrackItem";
import { Loader } from "./Loader";
import styled from "styled-components";

const Header = styled.div`
  margin-bottom: 50px;
  @media screen and (max-width: 780px) {
    text-align: center;
  }
`;

export const Recent = () => {
  const [recent, setRecent] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getRecentlyPlayed();
      setRecent(data.items);
    };
    fetchData().catch((err) => console.error(err));
  }, []);

  return (
    <div className="main-view">
      <Header>
        <h1>Recently played</h1>
      </Header>
      <div>
        {recent ? (
          recent.map((track) => (
            <TrackItem
              track={track.track}
              played_at={track.played_at}
              key={track.id}
            />
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};
