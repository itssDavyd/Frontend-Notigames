import React, { useState } from "react";
import StatsInput from "./StatsInput";
import "../EditStats.scss";
function StatsContent(props) {
  // console.log(props)
  const agregarStat = (Stat) => {
    props.onAdd(Stat)
  }
  const modificarStat = (Stat) => {
    props.onUpdate(Stat)
  }
  const eliminarStat = (Stat) => {
    props.onDelete(Stat)
  }
  const [campos, setCampos] = useState([]);
  const agregarCampo = () => {
    setCampos(campos.concat(<StatsInput key={campos.length} id={props.id} onAdd={agregarStat} />));
  };

  return (

    <div
      className="tab-pane fade"
      id={"v-pills-" + props.id}
      role="tabpanel"
      aria-labelledby={"v-pills-" + props.id + "-tab"}
    >
      <div className="tabPaneStatGame">
        {props.stats ? (
          props.stats.map((stat) =>
            props.id === stat.pivot.game_id ? (
              <StatsInput key={stat.id} id={props.id} datos={stat} onUpdate={modificarStat} onDelete={eliminarStat} />
            ) : (
              ""
            )
          )
        ) : (
          <StatsInput id={props.id} onAdd={agregarStat} />
        )}
        {campos}

        <div className="addCamp">
          <button className="btn-edit-juegos-elim-add btn btn-outline-success" type="button" onClick={agregarCampo}>
            Agregar Campo
          </button>
        </div>
      </div>
    </div>
  );
}

export default StatsContent;

// const Input = () => {
//   return <input placeholder="Your input here" />;
// };

// const Form = () => {
//   const [inputList, setInputList] = useState([]);

//   const onAddBtnClick = event => {
//     setInputList(inputList.concat(<Input key={inputList.length} />));
//   };

//   return (
//     <div>
//       <button onClick={onAddBtnClick}>Add input</button>
//       {inputList}
//     </div>
//   );
// };
