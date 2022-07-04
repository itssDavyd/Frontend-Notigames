import React from "react";

function EstadisticaNav(props) {
  return (
    <button
      className="nav-link"
      id={"nav-"+props.data.id+"-tab"}
      data-bs-toggle="tab"
      data-bs-target={"#nav-"+props.data.id}
      type="button"
      role="tab"
      aria-controls={"nav-"+props.data.id}
      aria-selected="false"
    >
    {props.data.name}
    </button>
  );
}
// <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</button>
// <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Contact</button>

export default EstadisticaNav;