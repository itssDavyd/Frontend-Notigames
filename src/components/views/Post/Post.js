import "./Post.scss";
import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Comentario from "./Comentario";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../scss/preloader.scss";

/**
 * Funcion que genera el contenedor del POST.
 * 
 * En esta fucion logramos generar el cuerpo del post, realizando unas operaciones antes contra los datos guardados de los usuarios y asi verificando todos los mismos.
 * @return [cuerpo HTML] Retorna los POST generados de la pagina (obtenidos del almacen de datos BDD mediante la interconexion AXIOS (libreria de terceros.)).
 */
function Post() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const idPost = useParams().id;

  const [post, setPost] = useState({
    errores: "",
  });

  useEffect(() => {
    axios.get("api/post/" + idPost).then((response) => {
      setPost(response.data);
      setIsLoading(false);
    });
  }, [idPost]);

  const [comentario, setComentario] = useState("");

  const onChangeComentario = (e) => {
    e.persist();
    setComentario(e.target.value);
  };

  const deletePost = () => {
    axios.delete("api/post/" + idPost).then((response) => {
      if (response.data.status === 200) {
        alert(response.data.message);
        navigate("/");
      }
    });
  };

  const crearComentario = (e) => {
    e.preventDefault();
    const data = {
      comment: comentario,
      user_id: JSON.parse(localStorage.getItem("user")).id,
      post_id: idPost,
    };

    axios.post("api/comment", data).then((response) => {
      if (response.data.status === 200) {
        axios
          .get("api/post/" + idPost)
          .then((response) => setPost(response.data));
        setComentario("");
      } else {
        setPost({ ...post, errores: response.data.errores });
      }
    });
  };

  const id_user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).id
    : "";

  const deleteComment = (comment) => {
    axios.delete("api/comment/" + comment).then((response) => {
      if (response.data.status === 200) {
        axios
          .get("api/post/" + idPost)
          .then((response) => setPost(response.data));
      } else {
        setPost({ ...post, errores: response.data.errores });
      }
    });
  };

  const isAdmin = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).admin
    : false;
  let PropietarioAdmin = "";

  if (isLoading) {
    return (
      <div>
        <Header />
        {/* <h1 className="text-center">Cargando...</h1> */}
        <div className="contPreload">
          <div className="preloader"></div>
          <div className="textCargando">Cargando...</div>
        </div>
        <Footer />
      </div>
    );
  } else {
    if (id_user === post.user.id || isAdmin) {
      PropietarioAdmin = (
        <div>
          <button
            onClick={deletePost}
            className="charactersCome btn btn-danger my-2"
            id="btnComentar"
            type="submit"
          >
            X
          </button>
          <Link to={"edit"} className="btn btn-outline-primary my-2">
            Modificar
          </Link>
        </div>
      );
    }
    return (
      <div>
        <Header />
        {/* Inicio Container Comentarios */}
        <div className="container-comentarios mb-5">
          {/* Inicio noticia */}
          <div className="noticia p-3">
            {/* Inicio Contenedor-footer */}
            <div className="container-footer">
              {/* Inicio Contenedor-Fecha Publi */}
              <div className="fechaPublicacion">{post.created_at}</div>
              {/* Fin Contenedor-Fecha Publi */}
              {/* Inicio Contenedor-Firma */}
              <div className="firma">{post.user.username}</div>
              {/* Fin Contenedor-Firma */}
            </div>
            {/* Si eres Dueño del post o Admin*/}
            {PropietarioAdmin}
            {/* Fin Contenedor-footer */}
            {/* Inicio Titulo noticia */}
            <h1 id="tNoticia">{post.tittle}</h1>
            {/* Fin Titulo noticia */}
            {/* Inicio Contenido noticia */}
            <p id="contenidoNoticia">{post.description}</p>
            {/* Fin Contenido noticia */}
            <div className="container-footer">
              <div className="firma">{post.game.name}</div>
            </div>
          </div>
          {/* Fin noticia */}
          {/* Añadir Comentario */}
          {localStorage.getItem("auth_token") && (
            <form onSubmit={crearComentario}>
              <div className="formContent justify-content-center">
                <div className="my-2 col-5">
                  <textarea
                    name="comentario"
                    className="form-control"
                    id="FormControlTextarea1"
                    value={comentario}
                    onChange={onChangeComentario}
                  ></textarea>
                  <span className="text-danger">
                    {post.errores ? post.errores.comment : ""}
                  </span>
                </div>
                <div className="button">
                  <button
                    type="submit"
                    id="btnComentar"
                    className="charactersCome btn btn-primary"
                  >
                    Comentar
                  </button>
                </div>
              </div>
            </form>
          )}
          {/* Fin Añadir Comentario */}
          {/* Inicio comentario */}
          {post.comments.map((comentario) => (
            <Comentario
              key={comentario.id}
              onDelete={deleteComment}
              datos={comentario}
            />
          ))}
          {/* Fin comentario */}
        </div>
        {/* Fin Container Comentarios */}
        <Footer />
      </div>
    );
  }
}

export default Post;
