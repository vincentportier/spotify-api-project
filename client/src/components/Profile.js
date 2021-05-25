import React, { useEffect, useState, Fragment } from "react";
import { getUserInfo } from "../spotify/index";
import styled from "styled-components";
import { Loader } from "./Loader";
import { logout } from "../spotify/index";
import { Link } from "react-router-dom";
import { TrackItem } from "./TrackItem";

const StyledProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  .container {
    display: flex;
    text-align: left;
  }
  .profile-url {
    &:hover {
      h1 {
        text-decoration: underline;
      }
    }
  }
`;

const Avatar = styled.div`
  width: 150px;
  height: 150px;

  overflow: hidden;
  display: flex;
  margin: auto;
  margin-bottom: 15px;
  img {
    object-fit: cover;
    border-radius: 100%;
    height: 100%;
  }
`;

const UserName = styled.h1`
  margin-bottom: 15px;
`;

const Logout = styled.a`
  ${({ theme }) => theme.mixins.button}
`;

const Stats = styled.div`
  font-size: var(--fz-xxs);
  margin-bottom: 20px;
  ul {
    display: flex;
    li {
      margin: 0px 15px;
      line-height: 20px;
      span {
        font-weight: bold;
      }
    }
  }
`;

export const Tracklist = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 50px;
  column-gap: 50px;

  @media screen and (max-width: 980px) {
    grid-template-columns: 1fr;
    grid-row-gap: 50px;
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 480px) {
      flex-direction: column;
      align-items: center;
      .toggle-button {
        margin-top: 15px;
      }
    }
  }
  h2 {
    font-size: var(--fz-lg);
  }
  .toggle-button {
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
    }
  }
`;

export const Profile = () => {
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [recommandations, setRecommandations] = useState(null);
  const [newReleases, setNewReleases] = useState(null);
  const [showMoreRecommandations, setShowMoreRecommandations] = useState(false);
  const [showMoreNews, setShowMoreNews] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserInfo();

      setPlaylists(data.playlists);
      setUser(data.user);
      setFollowing(data.following);
      setNewReleases(data.newReleases.albums.items);
      setRecommandations(data.recommandations.tracks);
    };
    fetchData().catch((e) => {
      console.error(e);
    });
  }, []);

  const image = !user ? "" : user.images.length > 0 ? user.images[0].url : "";
  const name = user ? user.display_name : null;
  const followers = user ? user.followers.total : 0;

  const spotify_profile_url = user ? user.external_urls.spotify : "/";

  return (
    <div className="main-view">
      {user ? (
        <Fragment>
          <StyledProfile>
            <a
              href={spotify_profile_url}
              target="_blank"
              rel="noopener"
              rel="noreferer"
              className="profile-url"
            >
              <Avatar>
                <img src={image}></img>
              </Avatar>

              <UserName>{name}</UserName>
            </a>
            <Stats>
              <ul>
                <li>
                  <span>{followers}</span>
                  <br />
                  Followers
                </li>
                <li>
                  <Link to="/artists">
                    <span>{following && following.artists.items.length}</span>
                    <br />
                    Following
                  </Link>
                </li>
                <li>
                  <span>{playlists && playlists.total}</span>
                  <br />
                  <Link to="/playlists">Playlists</Link>
                </li>
              </ul>
            </Stats>

            <Logout onClick={logout}>LOGOUT</Logout>
          </StyledProfile>
          <Tracklist>
            <div>
              <div className="title">
                <h2>What's new</h2>
                <a
                  onClick={() => setShowMoreNews(!showMoreNews)}
                  className="toggle-button"
                >
                  {showMoreNews ? "SHOW LESS" : "SHOW MORE"}
                </a>
              </div>
              {newReleases &&
                (showMoreNews
                  ? newReleases.map((album) => {
                      let track = {
                        album: album,
                        artists: album.artists,
                        name: album.name,
                        id: album.id,
                      };
                      return <TrackItem track={track} new_release />;
                    })
                  : newReleases.slice(0, 3).map((album) => {
                      let track = {
                        album: album,
                        artists: album.artists,
                        name: album.name,
                        id: album.id,
                      };
                      return <TrackItem track={track} new_release />;
                    }))}
            </div>
            <div>
              <div className="title">
                <h2>Recommandations</h2>
                <a
                  onClick={() =>
                    setShowMoreRecommandations(!showMoreRecommandations)
                  }
                  className="toggle-button"
                >
                  {showMoreRecommandations ? "SHOW LESS" : "SHOW MORE"}
                </a>
              </div>
              {recommandations &&
                (showMoreRecommandations
                  ? recommandations.map((track) => <TrackItem track={track} />)
                  : recommandations
                      .slice(0, 3)
                      .map((track) => <TrackItem track={track} />))}
            </div>
          </Tracklist>
        </Fragment>
      ) : (
        <Loader />
      )}
    </div>
  );
};
