
/**
 * Funcion para generar las flechas y sus posiciones correspondientes.
 * @param mixed props
 * 
 * @return [cuerpo HTML] Retorna el cuerpo del html en el cual se encuentra las flechas las cuales dependiendo de su estado tendran una posicion o otra.
 */
function Vermas(props) {
  if (props.estado) {
    return (
      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4 4a.5.5 0 0 0-.374.832l4 4.5a.5.5 0 0 0 .748 0l4-4.5A.5.5 0 0 0 12 6H4z" />
    );
  } else {
    return (
      <path
        className="hidden"
        d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4 9h8a.5.5 0 0 0 .374-.832l-4-4.5a.5.5 0 0 0-.748 0l-4 4.5A.5.5 0 0 0 4 11z"
      />
    );
  }
}
export default Vermas;
