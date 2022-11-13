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
    initialValues: { titulo: "", url: "", playlist: "Pokémon" },
  });
  const [formVisivel, setFormVisivel] = React.useState(false);

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
                playlist: formCadastro.values.playlist,
              })
              .then((resposta) => {})
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
            <select
              id="playlist"
              name="playlist"
              form="registerVideoForm"
              value={formCadastro.values.playlist}
              onChange={formCadastro.handleChange}
            >
              <option selected="selected" value="Pokémon">
                Pokémon
              </option>
              <option value="Ciência">Ciência</option>
            </select>
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      ) : null}
    </StyledRegisterVideo>
  );
}
