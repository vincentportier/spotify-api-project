import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { formatDuration } from "../utils/index";
import moment from "moment";

const Track = styled(Link)`
  display: flex;
  margin-top: 25px;
  text-align: left;

  .isHovered {
    background: var(--charcoal);
    img {
      opacity: 35%;
    }
  }
`;

const CoverWrapper = styled.div`
  position: relative;
  width: 45px;
  height: 45px;
  min-width: 45px;
  min-height: 45px;
  img {
    object-fit: cover;
    width: 100%;
  }

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
`;

const TrackDetails = styled.div`
  ${({ theme }) => theme.mixins.flexBetween}
  width: 100%;
  padding: 0 20px;
  font-size: var(--fz-xs);

  .track_name {
    font-size: var(--fz-md);
    font-weight: 600;
    margin-bottom: 2px;
    color: ${(props) => (props.isHovered ? "var(--primary)" : "white")};
  }

  .track_details {
    font-weight: 100;
    color: gray;
  }

  .played_at {
    font-weight: 100;
    color: gray;
    font-size: var(--fz-xxs);
  }
`;

export const TrackItem = ({ track, played_at, new_release, index }) => {
  const [isHovered, setIsHovered] = useState(null);

  return (
    <Fragment>
      {track && (
        <Track
          to={
            !new_release
              ? `/track/${track.id}`
              : `/artist/${track.artists[0].id}`
          }
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(null);
          }}
        >
          <CoverWrapper className={isHovered ? "isHovered" : null}>
            <img src={track.album.images[2].url}></img>
            {isHovered && <div>i</div>}
          </CoverWrapper>
          <TrackDetails isHovered={isHovered}>
            <div>
              <p className="track_name">{track.name}</p>

              <p className="track_details">
                {track.album.artists.map((artist, i, artists) => {
                  if (i === artists.length - 1) {
                    return <span>{artist.name} -</span>;
                  } else return <span>{artist.name}, </span>;
                })}
                <span>
                  {" "}
                  {track.album.name}
                  {played_at && (
                    <span className="played_at">
                      {moment(played_at).format(
                        " [- Played on] Do [of] MMM [at] h:mma"
                      )}
                    </span>
                  )}
                </span>
              </p>
            </div>
            {!new_release && <div>{formatDuration(track.duration_ms)}</div>}
          </TrackDetails>
        </Track>
      )}
    </Fragment>
  );
};
{
  /*       
   {topTracks ? (
        <div>
          {topTracks.items &&
            topTracks.items.map((track, i) => {
              return (
                <Track
                  to={`/track/${track.id}`}
                  onMouseEnter={() => setHoveredElement(i)}
                  onMouseLeave={() => setHoveredElement(null)}
                >
                  <CoverWrapper
                    className={hoveredElement === i ? "isHovered" : ""}
                  >
                    <img
                      src={track.album.images && track.album.images[2].url}
                    ></img>
                    {hoveredElement === i && <div>i</div>}
                  </CoverWrapper>
                  <TrackDetails i={i} hoveredElement={hoveredElement}>
                    <div>
                      <p className="track_name">{track.name}</p>
                      <p className="track_details">
                        {track.album.artists.map((artist, i, artists) => {
                          if (i === artists.length - 1) {
                            return <span>{artist.name} -</span>;
                          } else return <span>{artist.name}, </span>;
                        })}
                        <span> {track.album.name}</span>
                      </p>
                    </div>
                    <div>{formatDuration(track.duration_ms)}</div>
                  </TrackDetails>
                </Track>
              );
            })}
        </div>)</div>
}; */
}
