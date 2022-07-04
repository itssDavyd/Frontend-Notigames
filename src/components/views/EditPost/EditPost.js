import React, { useEffect, useState } from "react";
import "./EditPost.scss";
import Header from "../Header";
import Footer from "../Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

/**
 * Editar POST.
 * Esta funcion genera la pagina de editar post.
 * @return [cuerpo HTML] Retorna el cuerpo del html a la hora de Editar un post.
 */

function EditPost() {
  const id = useParams().id;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    tittle: "",
    description: "",
    idGame: "",
  });
  const [post, setPost] = useState();
  const [juegos, setJuegos] = useState();

  useEffect(() => {
    axios.get(`api/post/${id}`).then((res) => {
      setPost(res.data);
      setInputs({
        ...inputs,
        tittle: res.data.tittle,
        description: res.data.description,
        idGame: res.data.game.id,
      });
    });
  }, [id]);

  const idJuegoPost = post ? post.game.id : "";

  useEffect(() => {
    axios.get("api/game").then((response) => {
      for (const index in response.data) {
        if (response.data[index].id === idJuegoPost) {
          response.data.splice(index, 1);
        }
      }
      setJuegos(response.data);
    });
  }, [idJuegoPost]);

  const onChangeInputs = (e) => {
    e.persist();
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const editarPost = (e) => {
    e.preventDefault();
    axios
      .put("api/post/" + id, {
        tittle: inputs.tittle,
        description: inputs.description,
        idGame: inputs.idGame,
      })
      .then((res) => {
        if (res.status === 200) {
          navigate("/post/" + id);
        }
      });
  };

  return (
    <div className="m-0 row justify-content-center">
      <Header />
      <form onSubmit={editarPost} method="post" className="container p-3 mt-4">
        <div className="mb-3 col-md-12">
          <label htmlFor="tituloNoticia" className="form-label">
            Titulo:{" "}
          </label>
          <input
            name="tittle"
            type="text"
            className="form-control"
            onChange={onChangeInputs}
            value={inputs.tittle}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cuerpoNoticia" className="form-label">
            Cuerpo:{" "}
          </label>
          <textarea
            name="description"
            className="form-control"
            rows="3"
            onChange={onChangeInputs}
            value={inputs.description}
          />
        </div>
        <label htmlFor="idcategoria" className="form-label">
          Categoria:
        </label>
        <select
          className="form-select mb-3"
          onChange={onChangeInputs}
          name="idGame"
          value={inputs.idGame}
        >
          <option value={post ? post.game.id : ""}>
            {post ? post.game.name : ""}
          </option>

          {juegos
            ? juegos.map((juego) => (
                <option key={juego.id} value={juego.id}>
                  {juego.name}
                </option>
              ))
            : ""}
        </select>
        {/* <div className="mb-3 col-md-12">
          <label htmlFor="fechaPost" className="form-label">
            Fecha Post:{" "}
          </label>
          <input
            className="form-control"
            type="datetime"
            name="fechaPost"
            value="FechaA"
          />
        </div>
        <div className="mb-3 col-md-12">
          <label htmlFor="idPersona" className="form-label">
            Identificador Dueño:{" "}
          </label>
          <input
            className="form-control"
            type="text"
            name="idPersona"
            value="UserA"
          />
        </div> */}

        <button
          name="modificar"
          type="submit"
          className="btn btn-outline-success mt-2 mx-1 float-end"
        >
          Modificar
        </button>
        <Link
          to={"/post/" + id}
          className="btn btn-outline-danger mt-2 mx-1 float-end"
        >
          Cancelar
        </Link>
      </form>
      <Footer />
    </div>
  );
}

export default EditPost;
