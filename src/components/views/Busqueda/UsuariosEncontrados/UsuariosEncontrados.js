import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UsuariosEncontrados = (props) => {
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    axios.get("api/user/avatar/" + props.datos.id).then((res) => {
      setAvatar("http://localhost:8000/uploads/avatars/" + res.data);
    });
  }, [props.datos.id]);
  return (
    <div className="result-users card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <Link to={"/profile/" + props.datos.id}>
            <img
              src={avatar}
              className="img-fluid rounded-start"
              alt="FotoPerfil"
            />
          </Link>
        </div>
        <div className="estiloCardResult col-md-8">
          <div className="card-body">
            <h5 className="perfilEnlace card-title">
              <Link to={"/profile/" + props.datos.id} className="hrefPerfil">
                {props.datos.nombre + " " + props.datos.apellidos}
              </Link>
            </h5>
            <div className="card-text ctext"><div className="inlineCard">Username:  </div><div className="inlineCardResult">{props.datos.username} </div></div>
            <div className="card-text ctext"><div className="inlineCard">Email:  </div><div className="inlineCardResult">{props.datos.email} </div></div>
            <div className="card-text ctext"><div className="inlineCard">Provincia:  </div><div className="inlineCardResult">{props.datos.provincia} </div></div>
            <div className="card-text ctext"><div className="inlineCard">Ciudad:  </div><div className="inlineCardResult">{props.datos.ciudad} </div></div>
          </div >
        </div >
      </div >
    </div >
  );
};

export default UsuariosEncontrados;
