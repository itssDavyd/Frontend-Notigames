import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import "../scss/preloader.scss";
import PostIndividual from "./PostIndividual";
import CrearPost from "./CrearPost";
import "./Home.scss";

/**
 * Funcion que genera el contenedor Inicio.
 * @return [cuerpo HTML] Retorna el cuerpo del HTML que genera el Inicio de la pagina web.
 */

function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/post")
      .then((response) => response.json())
      .then((result) => {
        setPosts(result);
        setIsLoading(false);
      });
  }, []);

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
    return (
      <div>
        <Header />
        {localStorage.getItem("auth_token") && <CrearPost />}

        <div className="grandContPosts">
          {posts.map((post) => (
            <PostIndividual key={post.id} datos={post} />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
