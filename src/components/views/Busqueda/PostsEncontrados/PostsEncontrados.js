import React from "react";
import { Link } from "react-router-dom";

const PostsEncontrados = (props) => {
  return (
    <div className="card p-1 m-4 cardPubliPrincipal">
      <h5 className="editCardTitulo card-header">{props.datos.tittle}</h5>
      <div className="card-body">
        {/* <h5 className="card-title">{props.datos.tittle}</h5> */}
        <p className="cuerpoPost card-text">{props.datos.description}</p>
        <div className="btnIrPost">
          <Link to={"/post/" + props.datos.id} className="btnEspecialPost btn btn-primary">
            Ir al Post
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostsEncontrados;
