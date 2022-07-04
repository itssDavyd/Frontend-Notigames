import React, { useEffect, useState } from "react";
import "./EditStats.scss";
import Header from "../Header";
import Footer from "../Footer";
import StatsContent from "./StatsContent";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import volver from "../../../images/volver.gif";

function EditStats(props) {
  const id_user = useParams().id;
  const [perfil, setPerfil] = useState([]);

  const [juegos, setJuegos] = useState([]);

  useEffect(() => {
    axios.get("api/game").then((response) => {
      setJuegos(response.data);
    });
    axios.get("api/user/" + id_user).then((response) => {
      setPerfil(response.data.data);
    });
  }, [id_user]);

  const agregarStat = (Stat) => {
    let data = {
      name: Stat.name,
      value: Stat.value,
      idUser: perfil.id,
      idGame: Stat.idGame,
    };
    axios.post("api/statistic", data).then((res) => {
      axios.get("api/user/" + id_user).then((response) => {
        setPerfil(response.data.data);
      });
    });
  };

  const modificarStat = (Stat) => {
    axios
      .put(`api/statistic/${Stat.idStat}?value=${Stat.value}&name=${Stat.name}`)
      .then((res) => {
        axios.get("api/user/" + id_user).then((response) => {
          setPerfil(response.data.data);
        });
      });
  };
  let juegosPropios = [];
  for (const index in perfil.games) {
    juegosPropios.push(perfil.games[index][0]);
  }

  let otrosJuegos = [];
  otrosJuegos = juegos;
  for (const index in otrosJuegos) {
    for (const propioJuego of juegosPropios) {
      if (propioJuego.id === otrosJuegos[index].id) {
        otrosJuegos.splice(index, 1);
      }
    }
  }

  const eliminarStat = (idStat) => {
    axios.delete(`api/statistic/${idStat}`).then((res) => {
      axios.get("api/user/" + id_user).then((response) => {
        setPerfil(response.data.data);
      });
      axios.get("api/game").then((response) => {
        setJuegos(response.data);
      });
    });
  };
  //AQUI NUEVA INTERFAZ PARA CREAR O EDITAR INTERFAZ

  return (
    <div className="contEditStats">
      <Header />
      <div className="volver"><Link to={"/profile/" + id_user}>Volver<img src={volver} width={"30px"} height={"30px"} alt="volver" /></Link></div>
      <div className="Estadisticas d-flex mx-auto my-auto align-items-start mb-5 stats-diff">
        <div
          className="lateralIzq col-3 nav flex-column nav-pills"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <li className="misJuegos">Mis Juegos</li>
          {juegosPropios.length > 0
            ? juegosPropios.map((mios) => (
              <button
                className="nav-link"
                id={"v-pills-" + mios.id + "-tab"}
                data-bs-toggle="pill"
                data-bs-target={"#v-pills-" + mios.id}
                type="button"
                role="tab"
                aria-controls={"v-pills-" + mios.id}
                aria-selected="false"
                key={mios.id}
              >
                {mios.name}
              </button>
            ))
            : <span className="nodispongoJuegos">No tienes ningun juego</span>}

          <li className="misJuegos">Otros juegos</li>

          {otrosJuegos.length > 0
            ? otrosJuegos.map((otros) => (
              <button
                key={otros.id}
                className="nav-link"
                id={"v-pills-" + otros.id + "-tab"}
                data-bs-toggle="pill"
                data-bs-target={"#v-pills-" + otros.id}
                type="button"
                role="tab"
                aria-controls={"v-pills-" + otros.id}
                aria-selected="false"
              >
                {otros.name}
              </button>
            ))
            : <span className="nodispongoJuegos">No quedan mas juegos</span>}
        </div>
        <div className="panelStats col-9 tab-content panelestadisticas" id="v-pills-tabContent">
          <div className="nostats tab-pane fade show active" role="tabpanel">
            Usted no dispone todavía de estadisticas de juegos! .-.
          </div>

          {juegosPropios.map((juego) => (
            <StatsContent
              key={juego.id}
              id={juego.id}
              onDelete={eliminarStat}
              onUpdate={modificarStat}
              onAdd={agregarStat}
              stats={perfil.statistics}
            />
          ))}
          {otrosJuegos.map((juego) => (
            <StatsContent key={juego.id} onAdd={agregarStat} id={juego.id} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
//  <div class="tab-content" id="v-pills-tabContent">
//     <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">...</div>
//     <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">...</div>
//     <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...</div>
//     <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
//   </div>
export default EditStats;
