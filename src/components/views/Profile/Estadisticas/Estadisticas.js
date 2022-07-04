import React from "react";
import { Link, useParams } from "react-router-dom";
import EstadisticaNav from "./EstadisticaNav";
import EstadisticaContent from "./EstadisticaContent";

function Estadisticas(props) {
  const id = useParams().id;
  let juegos = [];
  for (const juego in props.juegos) {
    juegos.push(props.juegos[juego][0]);
  }

  let estadisticas = [];
  for (const stat in props.estadisticas) {
    estadisticas.push(props.estadisticas[stat]);
  }
  return (
    <div className="col-md-12">
      <div className="card text-center">
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              className="nav-link active"
              id={"nav-home-tab"}
              data-bs-toggle="tab"
              data-bs-target={"#nav-home"}
              type="button"
              role="tab"
              aria-controls={"nav-home"}
              aria-selected="true"
            >
              HOME
            </button>
            {juegos.map((juego) => (
              <EstadisticaNav key={juego.id} data={juego} />
            ))}
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          {localStorage.getItem("auth_token") &&
            JSON.parse(localStorage.getItem("user")).id.toString() === id ? (
            <div
              className="navHomeUser tab-pane fade active show"
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
              <Link to={"stats"} className="btn-edit btn btn-outline-primary">
                Crear/Actualizar Estadisticas
              </Link>
            </div>
          ) : (
            <div
              className="navHomeUser tab-pane fade active show"
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
              <span className="msgStastsUser">Estadisticas del usuario</span>
            </div>
          )}
          {juegos.map((juego) => (
            <EstadisticaContent
              key={juego.id}
              datos={estadisticas}
              juego={juego.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Estadisticas;
