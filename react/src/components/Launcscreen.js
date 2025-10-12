
import React from "react";
import logo from "../pictures/logo.png";

export default function Launchscreen() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#000000ff",
      }}
    >
      <img src={logo} alt="Logo" style={{ width: 300 }} />
    </div>
  );
}
