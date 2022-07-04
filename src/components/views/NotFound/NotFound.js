import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import "./NotFound.scss";
const NotFound = () => {
  return (
    <div>
      <Header />
      <div className="contPreload">
        <div className="preloader"></div>
        <div className="textCargando Notfound text-danger">Not Found 404</div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
