import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/views/Login";
import Profile from "./components/views/Profile";
import Home from "./components/views/Home";
import Post from "./components/views/Post";
import Register from "./components/views/Register";
import EditProfile from "./components/views/EditProfile";
import EditPost from "./components/views/EditPost";
import EditStats from "./components/views/EditStats";
import AdminPanel from "./components/views/AdminPanel";
import Busqueda from "./components/views/Busqueda";
import NotFound from "./components/views/NotFound";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.interceptors.request.use((conf) => {
  const token = localStorage.getItem("auth_token");
  conf.headers.Authorization = token ? `Bearer ${token}` : "";
  return conf;
});

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="login"
          element={
            localStorage.getItem("auth_token") ? <Navigate to="/" /> : <Login />
          }
        />
        <Route
          path="register"
          element={
            localStorage.getItem("auth_token") ? (
              <Navigate to="/" />
            ) : (
              <Register />
            )
          }
        />
        <Route path="post/:id" element={<Post />} />
        <Route path="post/:id/edit" element={<EditPost />} />
        {/* 
          Intento de solo ir si eres el usuario
          <Route path="post/:id/edit" element={JSON.parse(localStorage.getItem("user")).id.toString() === ":id" ? <Navigate to={`/profile/${JSON.parse(localStorage.getItem("user")).id.toString()}`} /> : <EditPost />} /> 
        */}
        <Route path="profile/:id" element={<Profile />} />
        <Route path="profile/:id/stats" element={<EditStats />} />
        <Route path="profile/:id/edit" element={<EditProfile />} />
        <Route path="adminPanel" element={<AdminPanel />} />
        <Route path="busqueda" element={<Busqueda />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
