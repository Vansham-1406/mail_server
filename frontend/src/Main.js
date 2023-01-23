import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import StarRateIcon from "@mui/icons-material/StarRate";
import DeleteIcon from "@mui/icons-material/Delete";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./App.css";

const Main = () => {
  const [nav, setNav] = useState(true);
  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("userData"));
    if (items) {
      setItems(items);
    }
  }, []);

  return (
    <div>
      {items?.firstName ? (
        <div>
          <div className={nav ? "mainNav" : "mainNav1"}>
            {nav ? (
              <div className="d-flex justify-content-between">
                <MenuIcon
                  className="fs-2 text-light ms-4 mt-3 mb-3 hamburger"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setNav(false);
                  }}
                />
                <h4 className="pt-3" style={{ color: "white" }}>
                  Welcome,{" "}
                  <span className="text-capitalize">{items?.firstName} </span>
                  <span className="text-capitalize">{items?.lastName} </span>
                </h4>
                <Button
                  variant="contained"
                  color="success"
                  style={{ width: "80px", height: "40px", marginTop: "12px" }}
                  className="me-3"
                  onClick={() => {
                    navigate("/");
                    localStorage.removeItem("userData");
                    setItems([]);
                  }}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="d-flex justify-content-between">
                <MenuOpenIcon
                  className="fs-2 mt-3 mb-3 menuPos"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setNav(true);
                  }}
                />
                <h4 className="pt-3" style={{ color: "white" }}>
                  Welcome,{" "}
                  {JSON.parse(localStorage.getItem("userData"))?.firstName ||
                    ""}{" "}
                  {JSON.parse(localStorage.getItem("userData"))?.lastName || ""}
                </h4>
                <Button
                  variant="contained"
                  color="success"
                  style={{ width: "80px", height: "40px", marginTop: "12px" }}
                  className="me-3"
                  onClick={() => {
                    localStorage.removeItem("userData");
                    navigate("/");
                  }}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
          <div className="d-flex">
            <div className={nav ? "navbar" : "navbar1"}>
              <div className="d-flex flex-column">
                <div className="mt-5 d-flex navbar_hover cursor_pointer">
                  <HomeIcon className="fs-2 icon_color ms-3 me-4 mt-3 mb-3"/>
                  {!nav && <p className="fs-6 fw-bold marg">Dashboard</p>}
                </div>
                <div className="d-flex navbar_hover cursor_pointer">
                  <StarRateIcon className="fs-2 icon_color ms-3 me-4 mt-3 mb-3" />
                  {!nav && <p className="fs-6 fw-bold marg">Saved</p>}
                </div>
                <div className="d-flex navbar_hover cursor_pointer">
                  <DeleteIcon className="fs-2 icon_color ms-3 me-4 mt-3 mb-3" />
                  {!nav && <p className="fs-6 fw-bold marg">Deleted</p>}
                </div>
                <div className="d-flex navbar_hover cursor_pointer">
                  <AccountBoxIcon className="fs-2 icon_color ms-3 me-4 mt-3 mb-3" />
                  {!nav && <p className="fs-6 fw-bold marg">Profile</p>}
                </div>
              </div>
            </div>
            <div className={nav ? "dashboard" : "dashboard1"}></div>
          </div>
        </div>
      ) : (
        <div className="main_banner">
          <div className="position-absolute top-50 start-50 translate-middle d-flex flex-column text-dark text-center">
            <p className="fs-2 fw-bold">Welcome to Mail Server!</p>
            <p className="fs-2">Login/Sigup to send mails freely!</p>
            <div className="d-flex justify-content-center mt-2">
              <button
                className="me-3 btn btn-secondary ps-3 pe-3"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </button>
              <button
                className="ms-3 btn btn-secondary ps-3 pe-3"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Signup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;