import React from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { videoService } from "../src/services/videoService";

function HomePage() {
  const service = videoService();

  const [valorDoFiltro, setValorDoFiltro] = React.useState("");
  const [playlists, setPlaylists] = React.useState({});

  React.useEffect(() => {
    service.getAllVideos().then((dados) => {
      const novasPlaylists = { ...playlists };

      dados.data.forEach((video) => {
        if (!novasPlaylists[video.playlist]) {
          novasPlaylists[video.playlist] = [];
        }

        novasPlaylists[video.playlist].push(video);
      });

      setPlaylists(novasPlaylists);
    });
  }, []);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Menu
          valorDoFiltro={valorDoFiltro}
          setValorDoFiltro={setValorDoFiltro}
        />
        <Header />
        <Timeline searchValue={valorDoFiltro} playlists={playlists} />
        <Favorites favorites={config.favorites} />
      </div>
    </>
  );
}

export default HomePage;

const StyledHeader = styled.div`
  background-color: ${({ theme }) => theme.backgroundLevel1};

  img.avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;

const StyledBanner = styled.div`
  height: 230px;
  width: 100%;
  background-image: url(${({ banner }) => banner});
  /*  background-image: url(${config.banner}); */
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: center;
`;

function Header() {
  return (
    <StyledHeader>
      <StyledBanner banner={config.banner} />
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

function Timeline({ searchValue, ...propriedades }) {
  // console.log("Dentro do componente", propriedades.playlists);
  const playlistNames = Object.keys(propriedades.playlists);
  // Statement
  // Retorno por expressão
  return (
    <StyledTimeline>
      {playlistNames.map((playlistName) => {
        const videos = propriedades.playlists[playlistName];
        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos
                .filter((video) => {
                  const titleNormalized = video.title.toLowerCase();
                  const searchValueNormalized = searchValue.toLowerCase();
                  return titleNormalized.includes(searchValueNormalized);
                })
                .map((video) => {
                  return (
                    <a key={video.url} href={video.url}>
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
    span {
      color: ${({ theme }) => theme.textColorBase || "#222222"};
    }
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
                <a key={canal.url} href={canal.url}>
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
