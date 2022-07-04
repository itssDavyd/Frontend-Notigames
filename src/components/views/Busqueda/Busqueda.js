import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import "../scss/preloader.scss";
import { useLocation } from "react-router-dom";
import axios from "axios";
import PostsEncontrados from "./PostsEncontrados";
import UsuariosEncontrados from "./UsuariosEncontrados";
import "./Busqueda.scss";

function useQuery() {
  //https://www.codingdeft.com/posts/react-router-tutorial/
  // Use the URLSearchParams API to extract the query parameters
  // useLocation().search will have the query parameters eg: ?foo=bar&a=b
  return new URLSearchParams(useLocation().search);
}

const Busqueda = () => {
  const query = useQuery();
  const term = query.get("term");

  const [isLoading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState();

  useEffect(() => {
    axios
      .get("api/post/search?palabra=" + term)
      .then((res) => {
        setBusqueda(res.data);
        setLoading(false);
      });
  }, [term]);

  if (isLoading) {
    return (
      <div>
        <Header />
        <div className="contPreload">
          <div className="preloader"></div>
          <div className="textCargando">Cargando...</div>
        </div>
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <Header />
        {term && <h2 className="resultadosPara">Resultados para <div className="termDivResult">'{term}'</div></h2>}
        <h4 className="usuariosResult">Usuarios</h4>
        {busqueda.users.length > 0 ? (
          busqueda.users.map((user) => (
            <UsuariosEncontrados key={user.id} datos={user} />
          ))
        ) : (
          <h4 className="resultadosPara">No se Encontro ningun Usuario.</h4>
        )}

        <h4 className="usuariosResult">Publicaciones</h4>
        {busqueda.posts.length > 0 ? (
          busqueda.posts.map((post) => (
            <PostsEncontrados key={post.id} datos={post} />
          ))
        ) : (
          <h4 className="resultadosPara">No se Encontro ninguna Publicación.</h4>
        )}

        <Footer />
      </div>
    );
  }
};

export default Busqueda;
