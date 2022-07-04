import React, { useState } from "react";
import "../../EditStats.scss";

function StatsInput(props) {

  const [updateInput, setUpdate] = useState({
    errores: "",
    name: props.datos ? props.datos.name : "",
    value: props.datos ? props.datos.value : "",
    idGame: props.id,
    idStat: props.datos ? props.datos.id : "",
  });

  const onChangeInputs = (e) => {
    e.persist();
    setUpdate({ ...updateInput, [e.target.name]: e.target.value });
  };
  const agregarStat = (e) => {
    e.preventDefault();
    props.onAdd(updateInput);
    setUpdate({ ...updateInput, name: "", value: "" });
  };

  const modificarStat = (e) => {
    e.preventDefault();
    props.onUpdate(updateInput);
  };
  const eliminarStat = (e) => {
    e.preventDefault();
    props.onDelete(updateInput.idStat);
  };
  return (
    <form className="inputsStats">
      <input
        type={"text"}
        name="name"
        onChange={onChangeInputs}
        value={updateInput.name}
      />
      <span className="flechaJuegos">{"🡇"}</span>
      <input
        type={"text"}
        name="value"
        onChange={onChangeInputs}
        value={updateInput.value}
      />
      {props.datos ? (
        <span>
          <button className="btn-edit-juegos btn btn-outline-primary" onClick={modificarStat}>
            Modificar
          </button>
          <button className="btn-edit-juegos-elim-add btn btn-outline-danger" onClick={eliminarStat}>
            Eliminar
          </button>
        </span>
      ) : (
        <button className="btn-edit-juegos-elim-add btn btn-outline-success" onClick={agregarStat}>
          Agregar
        </button>
      )}
    </form>
  );
}

export default StatsInput;
