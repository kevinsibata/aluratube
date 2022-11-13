import { createClient } from "@supabase/supabase-js";
import React from "react";
import { StyledRegisterVideo } from "./styles";

// Custom Hook
function useForm(propsDoForm) {
  const [values, setValues] = React.useState(propsDoForm.initialValues);

  return {
    values,
    handleChange: (e) => {
      const value = e.target.value;
      const name = e.target.name;
      setValues({
        ...values,
        [name]: value,
      });
    },
    clearForm: () => {
      setValues({});
    },
  };
}

const PROJECT_URL = "https://vicjngiwpmgiaveolcww.supabase.co";
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpY2puZ2l3cG1naWF2ZW9sY3d3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyOTY2MTcsImV4cCI6MTk4Mzg3MjYxN30.6RgVlkETTl5EBAK5_kgX0Vhwu2ZpbHFSmyMdRRbCh24";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export default function RegisterVideo() {
  const formCadastro = useForm({
    initialValues: {
      titulo: "",
      url: "",
      thumb: "",
      playlist: "Pokémon",
    },
  });
  const [formVisivel, setFormVisivel] = React.useState(false);
  const [campoNovaPlaylistVisivel, setCampoNovaPlaylistVisivel] =
    React.useState(false);

  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setFormVisivel(true)}>
        +
      </button>
      {/* Ternário */}
      {/* Operador de curto-circuito */}
      {formVisivel ? (
        <form
          id="registerVideoForm"
          onSubmit={(e) => {
            e.preventDefault();

            supabase
              .from("videos")
              .insert({
                title: formCadastro.values.titulo,
                url: formCadastro.values.url,
                thumb: formCadastro.values.thumb,
                playlist: formCadastro.values.playlist,
              })
              .then((resposta) => {
                window.location.reload();
              })
              .catch((err) => {
                console.log(err);
              });

            setFormVisivel(false);
            formCadastro.clearForm();
          }}
        >
          <div>
            <button
              type="button"
              className="close-modal"
              onClick={() => setFormVisivel(false)}
            >
              X
            </button>
            <input
              placeholder="Título do vídeo"
              name="titulo"
              value={formCadastro.values.titulo}
              onChange={formCadastro.handleChange}
            />
            <input
              placeholder="URL do vídeo"
              name="url"
              value={formCadastro.values.url}
              onChange={formCadastro.handleChange}
            />
            <input
              placeholder="Thumb do vídeo"
              name="thumb"
              value={formCadastro.values.thumb}
              onChange={formCadastro.handleChange}
            />
            {/* Possibilitar usuário de usar playlists já criadas ou então digitar uma nova*/}
            {campoNovaPlaylistVisivel ? (
              // Caso playlist Nova
              <input
                placeholder="Playlist"
                name="playlist"
                value={formCadastro.values.playlist}
                onChange={formCadastro.handleChange}
              />
            ) : (
              // Caso playlist já criada
              <select
                name="playlist"
                form="registerVideoForm"
                value={formCadastro.values.playlist}
                onChange={(e) => {
                  formCadastro.handleChange(e);

                  if (e.target.value === "[Nova playlist]") {
                    setCampoNovaPlaylistVisivel(true);
                  }
                }}
              >
                <option selected="selected" value="Pokémon">
                  Pokémon
                </option>
                <option value="Ciência">Ciência</option>
                <option value="[Nova playlist]">[Nova playlist]</option>
              </select>
            )}

            <button type="submit">Cadastrar</button>
          </div>
        </form>
      ) : null}
    </StyledRegisterVideo>
  );
}
