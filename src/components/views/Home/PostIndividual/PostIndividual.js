import React, { useState } from "react";
import Vermas from "./Vermas";
import { Link } from "react-router-dom";
import "./PostIndividual.scss";

/**
 * Funcion Para cada POST.
 * 
 * Esta funcion muestra el conjunto del contenedor POST individualmente (forma el contenido interior de cada post)
 * @param mixed props
 * @return [cuerpo HTML] Retorna el cuerpo del contenedor POST.
 */

function PostIndividual(props) {
  const [flecha, cambioFlecha] = useState(true);

  return (
    // Inicio Contenedor Noticias
    <div className="containerNoticia">
      {/* Inicio Contenedor Mensajes del Foro  */}
      <div className="mensajeForo">
        <div className="titulo text-center">
          <Link to={"/post/" + props.datos.id}>{props.datos.tittle}</Link>
        </div>
        {/* Inicio Cuerpo del Mensaje Foro */}
        <div className={flecha ? "contenido hidden" : "contenido show"}>
          {props.datos.description}
        </div>
        {/* Fin Cuerpo del Mensaje Foro */}

        {/* Inicio Flecha ver mas */}
        <div className="vermas">
          <span
            onClick={() => cambioFlecha(!flecha)}
            id={flecha ? "mas" : "menos"} // mas || menos
            data-dir={flecha ? "down" : "up"} // down || up
            className={
              flecha ? "arrow down align-self-end" : "arrow up align-self-end"
            } // down || arrow up
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-caret-down-square-fill"
              viewBox="0 0 16 16"
            >
              <Vermas estado={flecha} />
            </svg>
          </span>
        </div>
        {/* Fin Flecha ver mas */}

        {/* Inicio Contenedor-footer */}
        <div className="container-footer">
          {/* Inicio Contenedor-Fecha */}
          <div className="fechaPublicacion">
            {props.datos.fecha_publicacion}
          </div>
          {/* Fin Contenedor-Fecha */}

          {/* Inicio Contenedor-Firma */}
          <div className="firma">{props.datos.user_id}</div>
          {/* Fin Contenedor-Firma */}
        </div>
        {/* Fin Contenedor-footer */}
      </div>
      {/* Fin Contenedor Mensajes del Foro */}
    </div>
    // Fin Contenedor Noticias
  );
}

export default PostIndividual;
