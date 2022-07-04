import React from "react";
import EstadisticaJuego from "./EstadisticaJuego";

function EstadisticaContent(props) {
  return (
    <div
      className="tab-pane fade p-3"
      id={"nav-" + props.juego}
      role="tabpanel"
      aria-labelledby={"nav-" + props.juego + "-tab"}
    >
      {props.datos.map((estadistica) =>
        estadistica.pivot.game_id === props.juego ? (
          <EstadisticaJuego key={estadistica.id} datos={estadistica} />
        ) : (
          ""
        )
      )}
    </div>
  );
}

// EJEMPLO BOOTSTRAP 5   <div class="tab-pane fade " id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">.A</div>

export default EstadisticaContent;
