import "./Login.scss";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { useState } from "react";
import axios from "axios";

/**
 * Funcion Genera el contenedor de Login para los usuarios.
 * Esta funcion nos genera el contenedor de Login, con sus correspondientes datos.
 * 
 * @return [cuerpo HTML] Retorna si toda la verificacion del usuario es corresta el inicio del usuario a la pagina web. (home)
 */

function Login() {
  const navigate = useNavigate();
  const [loginInput, setLogin] = useState({
    username: "",
    password: "",
    errores: "",
    credentials: [],
  });

  const onChangeInputs = (e) => {
    e.persist();
    setLogin({ ...loginInput, [e.target.name]: e.target.value });
  };

  const inicioSesion = (e) => {
    e.preventDefault();

    const data = {
      username: loginInput.username,
      password: loginInput.password,
    };

    axios.get("sanctum/csrf-cookie").then((response) => {
      axios.post("api/login", data).then((response) => {
        if (response.data.status === 200) {
          localStorage.setItem("auth_token", response.data.access_token);
          localStorage.setItem("user", JSON.stringify(response.data.data));
          navigate("/");
        } else if (response.data.status === 401) {
          setLogin({
            ...loginInput,
            credentials: response.data.message,
            errores: "",
          });
        } else {
          setLogin({
            ...loginInput,
            errores: response.data.errores,
            credentials: [],
          });
        }
      });
    });
  };
  return (
    <div className="main">
      <Header />
      <div className="loginCenter">
        <form onSubmit={inicioSesion} className="formularioLoginClass">
          <h2 className="text-center">NotiGames</h2>
          <div className="mb-3">
            <label htmlFor="usuario" className="form-label">
              Usuario
            </label>
            <input
              type="text"
              className="form-control"
              name="username"
              id="usuario"
              value={loginInput.username}
              onChange={onChangeInputs}
            />
            <span className="text-danger">{loginInput.errores.username}</span>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              value={loginInput.password}
              onChange={onChangeInputs}
            />
            <span className="text-danger">{loginInput.errores.password}</span>
            <span className="text-danger">{loginInput.credentials}</span>
          </div>
          <button type="submit" className="btn my-2 btn-primary">
            Iniciar Sesion
          </button>
          {/* <Link to={"/register"} className="btn my-2 btn-primary">
            Registrarse
          </Link> */}
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
