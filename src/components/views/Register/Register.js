import "./Register.scss";
import Header from "../Header";
import Footer from "../Footer";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

/**
 * Funcion que genera el contenedor Registro.
 * @return [cuerpo HTML] Retorna el registro correcto del usuario en caso de que sea asi si no devolvera una serie de alertas para el usuario.
 */
function Register() {
  const navigate = useNavigate();
  const [registerInput, setRegister] = useState({
    usuario: "",
    password: "",
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    provincia: "",
    ciudad: "",
    errores: [],
  });

  const onChangeInputs = (e) => {
    e.persist();
    setRegister({ ...registerInput, [e.target.name]: e.target.value });
  };

  const register = (e) => {
    e.preventDefault();
    const data = {
      nombre: registerInput.nombre,
      apellidos: registerInput.apellidos,
      telefono: registerInput.telefono,
      ciudad: registerInput.ciudad,
      provincia: registerInput.provincia,
      email: registerInput.email,
      username: registerInput.usuario,
      password: registerInput.password,
    };

    axios
      .get("sanctum/csrf-cookie")
      .then((response) =>
        axios.post("api/register", data).then((response) => {
          if (response.data.status === 200) {
            localStorage.setItem("auth_token", response.data.access_token);
            localStorage.setItem("user", JSON.stringify(response.data.data));
            navigate("/");
          } else {
            setRegister({ ...registerInput, errores: response.data.errores });
          }
        })
      )
      .catch((error) => console.log(error));
  };
  return (
    <div id="load">
      <Header />
      {/* Inicio Contenedor registro */}
      <form
        onSubmit={register}
        className="contRegister d-flex justify-content-center"
      >
        <div className="container rounded bg-white mt-0 mb-0">
          <div className="row">
            <div className="col-md-4 border-end">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <img
                  className="rounded-circle mt-5"
                  width="150px"
                  alt="Foto Default"
                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                />
                <span>
                  ¿Ya tienes una cuenta?{" "}
                  <Link to={"/login"}>Inicia Sesión</Link>
                </span>
              </div>
            </div>
            <div className="col-md-8 border-end">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-center align-items-center mb-3">
                  <h4 className="text-right">Registrarse en NotiGames</h4>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">Usuario</label>
                    <input
                      type="text"
                      className="form-control"
                      name="usuario"
                      placeholder="Usuario"
                      value={registerInput.usuario}
                      onChange={onChangeInputs}
                    />
                    <span className="text-danger">
                      {registerInput.errores.username}
                    </span>
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Ingrese su Contraseña"
                      value={registerInput.password}
                      onChange={onChangeInputs}
                    />
                    <span className="text-danger">
                      {registerInput.errores.password}
                    </span>
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
                      value={registerInput.nombre}
                      onChange={onChangeInputs}
                    />
                    <span className="text-danger">
                      {registerInput.errores.nombre}
                    </span>
                  </div>
                  <div className="col-md-6">
                    <label className="labels">Apellidos</label>
                    <input
                      type="text"
                      className="form-control"
                      name="apellidos"
                      placeholder="Apellidos"
                      value={registerInput.apellidos}
                      onChange={onChangeInputs}
                    />
                    <span className="text-danger">
                      {registerInput.errores.apellidos}
                    </span>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-12">
                    <label className="labels">Correo</label>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      placeholder="example@example.com"
                      value={registerInput.email}
                      onChange={onChangeInputs}
                    />
                    <span className="text-danger">
                      {registerInput.errores.email}
                    </span>
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Telefono movil</label>
                    <input
                      type="text"
                      className="form-control"
                      name="telefono"
                      placeholder="Ingrese el numero de telefono"
                      value={registerInput.telefono}
                      onChange={onChangeInputs}
                    />
                    <span className="text-danger">
                      {registerInput.errores.telefono}
                    </span>
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Provincia</label>
                    <input
                      type="text"
                      className="form-control"
                      name="provincia"
                      placeholder="Ingrese la Provincia"
                      value={registerInput.provincia}
                      onChange={onChangeInputs}
                    />
                    <span className="text-danger">
                      {registerInput.errores.provincia}
                    </span>
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Ciudad</label>
                    <input
                      type="text"
                      className="form-control"
                      name="ciudad"
                      placeholder="Ciudad"
                      value={registerInput.ciudad}
                      onChange={onChangeInputs}
                    />
                    <span className="text-danger">
                      {registerInput.errores.ciudad}
                    </span>
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <button className="btn btn-primary" type="submit">
                    Registrarse
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* Fin Contenedor registro */}
      <Footer />
    </div>
  );
}

export default Register;
