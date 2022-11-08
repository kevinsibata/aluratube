import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";

function HomePage() {
  return (
    <>
      <CSSReset />
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Menu />
        <Header />
        <Timeline playlists={config.playlists} />
        <Favorites favorites={config.favorites} />
      </div>
    </>
  );
}

export default HomePage;

const StyledHeader = styled.div`
  div.banner {
    height: 230px;
    width: 100%;
    background-image: url(${config.banner});
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: center;
  }
  img.avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info {
    margin-top: 50px;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;

function Header() {
  return (
    <StyledHeader>
      <div className="banner"></div>
      <section className="user-info">
        <img
          className="avatar"
          src={`https://github.com/${config.github}.png`}
        />
        <div>
          <h2>{config.name}</h2>
          <p> {config.job}</p>
        </div>
      </section>
    </StyledHeader>
  );
}

function Timeline(propriedades) {
  // console.log("Dentro do componente", propriedades.playlists);
  const playlistNames = Object.keys(propriedades.playlists);
  // Statement
  // Retorno por expressão
  return (
    <StyledTimeline>
      {playlistNames.map((playlistName) => {
        const videos = propriedades.playlists[playlistName];
        console.log(playlistName);
        console.log(videos);
        return (
          <section>
            <h2>{playlistName}</h2>
            <div>
              {videos.map((video) => {
                return (
                  <a href={video.url}>
                    <img src={video.thumb} />
                    <span>{video.title}</span>
                  </a>
                );
              })}
            </div>
          </section>
        );
      })}
    </StyledTimeline>
  );
}

const StyledFavorites = styled.div`
  flex: 1;
  width: 100%;
  padding: 16px;
  overflow: hidden;
  section {
    width: 100%;
    padding: 0;
    overflow: hidden;
    padding: 16px;
  }
  h2 {
    font-size: 16px;
    margin-bottom: 16px;
    text-transform: capitalize;
  }
  div.favorite-cards {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 8px;
  }
  div.favorite-card {
    display: flex;
    flex-direction: column;
    width: 100px;
    align-items: center;
    text-align: center;
  }
  img {
    border-radius: 50%;
    width: 100px;
    height: 100px;
  }
  span {
    font-size: 14px;
    font-weight: 400;
    color: #000;
  }
`;

function Favorites(props) {
  return (
    <StyledFavorites>
      <section>
        <h2>AluraTubes Favoritos</h2>
        <div className="favorite-cards">
          {props.favorites.map((canal) => {
            return (
              <div className="favorite-card">
                <a href={canal.url}>
                  <img src={canal.avatar} />
                  <span>@{canal.channel}</span>
                </a>
              </div>
            );
          })}
        </div>
      </section>
    </StyledFavorites>
  );
}
