import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import axios from "axios";
import "../scss/preloader.scss";
import "./adminPanel.scss";

function AdminPanel() {
  const [juegos, setJuegos] = useState();
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("api/game").then((res) => {
      setJuegos(res.data);
    });
    axios.get("api/user").then((res) => {
      setUsers(res.data);
    });
    setLoading(false);
  }, []);

  const [juegoNuevo, setJuegoNuevo] = useState("");
  const onChangeInputAgregar = (e) => {
    setJuegoNuevo(e.target.value);
  };

  const añadirJuego = (e) => {
    e.preventDefault();
    axios
      .post("api/game", {
        name: juegoNuevo,
      })
      .then((res) => {
        setJuegoNuevo("");
        axios.get("api/game").then((res) => {
          setJuegos(res.data);
        });
      });
  };

  const onChangeInput = (e) => {
    juegos.map((juego) => {
      if (juego.id.toString() === e.target.id) {
        juego.name = e.target.value;
      }
    });
  };
  const modificarJuego = (e) => {
    juegos.map((juego) => {
      if (juego.id.toString() === e.target.id) {
        axios.put("api/game/" + e.target.id + "?name=" + juego.name).then(
          axios.get("api/game").then((res) => {
            setJuegos(res.data);
          })
        );
      }
    });
  };

  const eliminarJuego = (e) => {
    axios.delete("api/game/" + e.target.id).then((res) =>
      axios.get("api/game").then((res) => {
        setJuegos(res.data);
      })
    );
  };

  const eliminarUser = (e) => {
    axios.delete("api/user/" + e.target.id).then((res) =>
      axios.get("api/user").then((res) => {
        setUsers(res.data);
      })
    );
  };

  const onChangeAdmin = (e) => {
    e.persist();
    axios
      .put("api/admin/" + e.target.id + "?admin=" + e.target.value)
      .then((res) =>
        axios.get("api/user").then((res) => {
          setUsers(res.data);
        })
      );
  };

  if (loading) {
    return (
      <div className="adminPanel">
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
      <div className="adminPanel">
        <Header />
        <div className="contUsersAdm d-flex">
          <div className="Estadisticas d-flex mx-auto my-auto align-items-start">
            <div
              className="col-3 nav flex-column nav-pills"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <button
                className="btn-admins nav-link active"
                id="v-pills-users-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-users"
                type="button"
                role="tab"
                aria-controls="v-pills-users"
                aria-selected="false"
              >
                Usuarios
              </button>
              <button
                className="btn-admins nav-link"
                id={"v-pills-juegos-tab"}
                data-bs-toggle="pill"
                data-bs-target="#v-pills-juegos"
                type="button"
                role="tab"
                aria-controls="v-pills-juegos"
                aria-selected="false"
              >
                Juegos
              </button>
            </div>
            <div className="col-9 tab-content" id="v-pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="v-pills-users"
                role="tabpanel"
                aria-labelledby="v-pills-users-tab"
              >
                <div className="admins">
                  <div className="useradmin"> USUARIOS ADMINISTRADORES</div>
                  {users
                    ? users.map((user) =>
                      user.admin === 1 ? (
                        <div key={user.id}>
                          {user.username}{" "}
                          <select
                            // className="form-select"
                            id={user.id}
                            onChange={onChangeAdmin}
                            name="admin"
                            value={user.admin}
                          >
                            <option value={1}>Admin</option>
                            <option value={0}>No Admin</option>
                          </select>
                          <button
                            type="button"
                            id={user.id}
                            className="btn btn-outline-danger"
                            onClick={eliminarUser}
                          >
                            Eliminar
                          </button>
                        </div>
                      ) : (
                        ""
                      )
                    )
                    : ""}
                </div>
                <div className="noAdmins">
                  <div className="useradmin">USUARIOS NO ADMINS</div>
                  {users
                    ? users.map((user) =>
                      user.admin === 0 ? (
                        <div key={user.id}>
                          {user.username}{" "}
                          {/* <input type={"text"} value={user.admin} /> */}
                          <select
                            // className="form-select"
                            id={user.id}
                            onChange={onChangeAdmin}
                            name="admin"
                            value={user.admin}
                          >
                            <option value={1}>Admin</option>
                            <option value={0}>No Admin</option>
                          </select>
                          <button
                            type="button"
                            id={user.id}
                            className="btn btn-outline-danger"
                            onClick={eliminarUser}
                          >
                            Eliminar
                          </button>
                        </div>
                      ) : (
                        ""
                      )
                    )
                    : ""}
                </div>
              </div>

              <div
                className="tab-pane fade"
                id="v-pills-juegos"
                role="tabpanel"
                aria-labelledby="v-pills-juegos-tab"
              >
                <div className="juegosAdmin">
                  <div className="useradmin">JUEGOS</div>
                  {juegos
                    ? juegos.map((juego) => (
                      <div key={juego.id} className="p">
                        <input
                          id={juego.id}
                          onChange={onChangeInput}
                          type={"text"}
                          defaultValue={juego.name}
                        />
                        <button
                          id={juego.id}
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={modificarJuego}
                        >
                          Modificar
                        </button>
                        <button
                          id={juego.id}
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={eliminarJuego}
                        >
                          Eliminar
                        </button>
                      </div>
                    ))
                    : ""}
                  <div className="addJuego">
                    <form onSubmit={añadirJuego}>
                      <input
                        onChange={onChangeInputAgregar}
                        type={"text"}
                        value={juegoNuevo}
                      />
                      <button type="submit" className="btn btn-outline-success">
                        Añadir
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default AdminPanel;
