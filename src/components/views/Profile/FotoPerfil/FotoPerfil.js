/**
 * Funcion que genera el contenedor Foto del Perfil.
 * 
 * @return [cuerpo HTML] Retorna la foto del perfil de cada usuario que tengan guardada en la bdd.
 */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function FotoPerfil() {
  const id = useParams().id;
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    axios.get("api/user/avatar/" + id).then((res) => {
      setAvatar("http://localhost:8000/uploads/avatars/" + res.data);
    });
  }, [id]);

  const [imagen, setImagen] = useState();

  const onChangeImagen = (e) => {
    setImagen(e.target.files[0]);
  };

  const subirFoto = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("avatar", imagen);
    axios.post("api/user/avatar/" + id, data).then((res) => {
      if (res.status === 200) {
        setAvatar("http://localhost:8000/uploads/avatars/" + res.data);
      }
    });
  };

  return (
    // Edit de foto
    <div className="card am">
      <div className="card-body">
        <div className="d-flex flex-column align-items-center text-center">
          <img
            src={avatar}
            alt="fotoPerfil"
            className="rounded-circle"
            width="170"
          />
          <div className="mt-3">
            {localStorage.getItem("auth_token") &&
              JSON.parse(localStorage.getItem("user")).id.toString() === id ? (
              <form
                onSubmit={subirFoto}
                method="POST"
                encType="multipart/form-data"
              >
                <div id="div_file">
                  <p id="texto">Selecciona</p>
                  <input
                    type="file"
                    name="imagen"
                    id="btn_enviar"
                    onChange={onChangeImagen}
                  />
                </div>
                <div id="div_file">
                  <p id="texto">Subir Foto</p>
                  <input type="submit" name="subir" id="btn_enviar" />
                </div>
              </form>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FotoPerfil;
