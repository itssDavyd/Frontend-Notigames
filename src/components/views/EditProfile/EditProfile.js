import React, { useEffect, useState } from "react";
import "./EditProfile.scss";
import Header from "../Header";
import Footer from "../Footer";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

/**
 * Editar Perfil.
 * 
 * Esta funcion genera la pagina de editar perfil del usuario, la cual procesa un tipo de propiedades para verificar que es este usuario el propietario del perfil a editar.
 * @param mixed props
 * @return [cuerpo HTML] Retorna el cuerpo del html a la hora de Editar un perfil.
 */

function EditProfile(props) {
  const id = useParams().id;

  const navigate = useNavigate();

  const [updateInput, setUpdate] = useState({
    errores: "",
  })

  useEffect(() => {
    axios.get("api/user/" + id)
      .then((result) => setUpdate(result.data.data))
  }, [id]);

  const [avatar, setAvatar] = useState();

  useEffect(() => {
    axios.get("api/user/avatar/" + id).then((res) => {
      setAvatar("http://localhost:8000/uploads/avatars/" + res.data);
    });
  }, [id]);

  const onChangeInputs = (e) => {
    e.persist();
    setUpdate({ ...updateInput, [e.target.name]: e.target.value })
  }

  const actualizaPerfil = (e) => {
    e.preventDefault();
    // peticion para actualizar perfil
    axios
      .put("api/user/" + id, {
        nombre: updateInput.nombre,
        apellidos: updateInput.apellidos,
        telefono: updateInput.telefono,
        provincia: updateInput.provincia,
        ciudad: updateInput.ciudad,
        email: updateInput.email,
        username: updateInput.username,
        password: updateInput.password,
      })
      .then((response) => {
        if (response.data.status === 200) {
          alert("Usuario Actualizado correctamente");
          navigate("/profile/" + id);
        } else {
          setUpdate({ ...updateInput, errores: response.data.errores })
        }
      });
  }


  return (
    <div id="load">
      <Header />

      {/* Inicio Contenedor Editar-Perfil */}
      <form onSubmit={actualizaPerfil}>
        <div className="simu-body d-flex justify-content-center aling-self-center mt-5">
          <div className="container rounded bg-white mt-0 mb-0">
            <div className="row">
              <div className="col-md-4 border-end">
                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                  <img
                    className="rounded-circle mt-5"
                    width="150px"
                    alt="Foto Default o tuya"
                    src={avatar}
                  />
                </div>
              </div>
              <div className="col-md-8 border-end">
                <div className="p-3 py-5">
                  <div className="d-flex justify-content-center align-items-center mb-3">
                    <h4 className="tilEditProfile text-right">Edita tu Perfil</h4>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <label className="labels">Usuario</label>
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        placeholder="Usuario"
                        defaultValue={updateInput.username}
                        onChange={onChangeInputs}
                      />
                      <span className="text-danger">{(updateInput.errores) ? updateInput.errores["username"] : ""}</span>
                    </div>
                    <div className="col-md-12">
                      <label className="labels">Contraseña</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Ingrese su Contraseña"
                        defaultValue={updateInput.password}
                        onChange={onChangeInputs}
                      />
                      <span className="text-danger">{(updateInput.errores) ? updateInput.errores["password"] : ""}</span>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-6">
                      <label className="labels">Nombre</label>
                      <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        placeholder="Nombre"
                        defaultValue={updateInput.nombre}
                        onChange={onChangeInputs}
                      />
                      <span className="text-danger">{(updateInput.errores) ? updateInput.errores["nombre"] : ""}</span>
                    </div>
                    <div className="col-md-6">
                      <label className="labels">Apellidos</label>
                      <input
                        type="text"
                        className="form-control"
                        name="apellidos"
                        placeholder="Apellidos"
                        defaultValue={updateInput.apellidos}
                        onChange={onChangeInputs}
                      />
                      <span className="text-danger">{(updateInput.errores) ? updateInput.errores["apellidos"] : ""}</span>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-12">
                      <label className="labels">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        placeholder="example@gmail.com"
                        defaultValue={updateInput.email}
                        onChange={onChangeInputs}
                      />
                      <span className="text-danger">{(updateInput.errores) ? updateInput.errores["email"] : ""}</span>
                    </div>
                    <div className="col-md-12">
                      <label className="labels">Telefono movil</label>
                      <input
                        type="text"
                        className="form-control"
                        name="telefono"
                        placeholder="Ingrese el numero de telefono"
                        defaultValue={updateInput.telefono}
                        onChange={onChangeInputs}
                      />
                      <span className="text-danger">{(updateInput.errores) ? updateInput.errores["telefono"] : ""}</span>
                    </div>
                    <div className="col-md-12">
                      <label className="labels">Provincia</label>
                      <input
                        type="text"
                        className="form-control"
                        name="provincia"
                        placeholder="Ingrese la Provincia"
                        defaultValue={updateInput.provincia}
                        onChange={onChangeInputs}
                      />
                      <span className="text-danger">{(updateInput.errores) ? updateInput.errores["provincia"] : ""}</span>
                    </div>
                    <div className="col-md-12">
                      <label className="labels">Ciudad</label>
                      <input
                        type="text"
                        className="form-control"
                        name="ciudad"
                        placeholder="Ciudad"
                        defaultValue={updateInput.ciudad}
                        onChange={onChangeInputs}
                      />
                      <span className="text-danger">{(updateInput.errores) ? updateInput.errores["ciudad"] : ""}</span>
                    </div>
                  </div>
                  <div className="mt-5 text-center edit-profile-btn">
                    <button className="btn-edit btn btn-primary profile-button" type="submit">
                      Editar
                    </button>
                    <Link
                      to={"/profile/" + id}
                      className="btn-edit btn btn-primary profile-button"
                    >
                      Cancelar
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* Fin Contenedor Editar-Perfil */}
      <Footer />
    </div>
  );
}

export default EditProfile;
