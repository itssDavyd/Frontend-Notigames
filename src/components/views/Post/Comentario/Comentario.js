import "./Comentario.scss";

/**
 * La funcion genera el componente del Comentario.
 * 
 * En esta funcion obtenemos el cuerpo del comentario el cual antes realiza unas operaciones pertinentes para obtener los datos de un JSON.
 * @param mixed props
 * 
 * @return [cuerpo HTML] Retorna el cuerpo del contenedor HTML de los comentarios.
 */
function Comentario(props) {

  const deleteComentario = () => {
    props.onDelete(props.datos.id);
  };

  const id_user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : "";
  const isAdmin = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).admin : false;
  let PropietarioAdmin = ""
  if (props.datos.user_id === id_user || isAdmin) {
    PropietarioAdmin = (<button
      onClick={deleteComentario}
      className="charactersCome btn btn-danger my-2 float-end"
      id="btnComentar"
      type="button"
    >
      X
    </button>)
  }
  return (
    <div className="comentario">
      <div className="card mb-2">
        <div className="card-header">
          {/* Si eres dueño o Admin */}
          {PropietarioAdmin}
          <h5 className="pt-2">
            <strong>{props.datos.user_id}</strong>
          </h5>
        </div>
        <div className="card-body">
          <h5 className="card-title">{props.datos.comment}</h5>
          <p className="card-text"></p>
          <span id="btnComentar" className="btnNo btn btn-primary">
            {props.datos.created_at}
          </span>
        </div>
      </div>
    </div>
  );
}
export default Comentario;
