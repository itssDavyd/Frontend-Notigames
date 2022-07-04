import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CrearPost.scss";
const CrearPost = () => {
  const navigate = useNavigate();
  const [juegos, setJuegos] = useState();
  let date = new Date();
  const [formulario, setFormulario] = useState({
    titulo: "",
    texto: "",
    juego: "default",
    fechaPost:
      date.getFullYear() +
      "-" +
      date.toLocaleString("es-ES", { month: "2-digit" }) +
      "-" +
      date.toLocaleString("es-ES", { day: "2-digit" }),
    horaPost: date.toLocaleTimeString(),
  });

  const onChangeInput = (e) => {
    e.persist();
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios.get("api/game").then((res) => setJuegos(res.data));
  }, []);

  const crearPost = (e) => {
    e.preventDefault();
    axios
      .post("api/post", {
        tittle: formulario.titulo,
        description: formulario.texto,
        user: JSON.parse(localStorage.getItem("user")).id,
        game: formulario.juego,
        fechaPublicacion: formulario.fechaPost + " " + formulario.horaPost,
      })
      .then((res) => {
        setFormulario({
          titulo: "",
          texto: "",
          juego: "default",
          fechaPost: "",
          horaPost: "",
        });
        setChecked("0");
        navigate("/post/" + res.data[1].id);
      });
  };
  const [checked, setChecked] = useState("0");
  const onChangeCheckbox = (e) => {
    if (checked === "1") {
      setChecked("0");
    } else {
      setChecked("1");
    }
    setFormulario({
      ...formulario,
      fechaPost:
        date.getFullYear() +
        "-" +
        date.toLocaleString("es-ES", { month: "2-digit" }) +
        "-" +
        date.toLocaleString("es-ES", { day: "2-digit" }),
      horaPost: date.toLocaleTimeString(),
    });
  };

  return (
    <div className="CajonFormCrear">
      <div className="mensajeForo foroCrear">
        <form onSubmit={crearPost} className="p-3 mt-3">
          <div className="mb-3 col-md-12">
            <label htmlFor="tituloNoticia" className="form-label">
              Titulo:{" "}
            </label>
            <input
              name="titulo"
              type="text"
              onChange={onChangeInput}
              value={formulario.titulo}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cuerpoNoticia" className="form-label">
              Cuerpo:{" "}
            </label>
            <textarea
              name="texto"
              onChange={onChangeInput}
              value={formulario.texto}
              className="form-control"
              rows="3"
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="cuerpoNoticia" className="form-label">
              Juegos:{" "}
            </label>
            <select
              className="form-select"
              name="juego"
              onChange={onChangeInput}
              value={formulario.juego}
            >
              <option value={"default"}>--- Selecciona un Juego --- </option>
              {juegos &&
                juegos.map((juego) => (
                  <option key={juego.id} value={juego.id}>
                    {juego.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-3 form-check">
            <input
              className="form-check-input"
              type="checkbox"
              onChange={onChangeCheckbox}
              value={checked}
              checked={checked === "1" ? true : false}
              id="postProgramado"
            />
            <label className="form-check-label" htmlFor="postProgramado">
              Publicacion Programada
            </label>
          </div>
          {checked === "1" && (
            <div className="programado">
              <div className="mb-3 col-md-12">
                <label htmlFor="fechaPost" className="form-label">
                  Fecha Post:{" "}
                </label>
                <input
                  className="form-control"
                  onChange={onChangeInput}
                  value={formulario.fechaPost}
                  type="date"
                  name="fechaPost"
                />
              </div>
              <div className="mb-3 col-md-12">
                <label htmlFor="horaPost" className="form-label">
                  Hora Post:{" "}
                </label>
                <input
                  className="form-control"
                  onChange={onChangeInput}
                  value={formulario.horaPost}
                  type="time"
                  name="horaPost"
                />
              </div>
            </div>
          )}
          <div className="cajonBtnPublicar">
            <button
              name="publicarName"
              type="submit"
              className="publicarPostCreado btn btn-outline-success mt-2"
            >
              Publicar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearPost;
