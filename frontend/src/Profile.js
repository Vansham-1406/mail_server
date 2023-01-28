import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import StarRateIcon from "@mui/icons-material/StarRate";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./App.css";
import axios from "axios";
import Temp from './temp'

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Profile = () => {
  const [nav, setNav] = useState(true);
  const navigate = useNavigate();
  const [mess, setMess] = useState([])
  const [items, setItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("userData"));
    if (items) {
      setItems(items);
    }
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8450/message/getData?id=${items?.username}`)
      .then((response) => 
      {
        setMess(response.data.response)
      })
      .catch((error) => {
        console.log(error);
      });
    }, [items]);
    console.log(mess)
    
    
  var today = new Date();
  const [messageDetails, setMessageDetails] = useState({
    From : "",
    To: "",
    Time: today,
    Saved: false,
    Deleted: false,
    Opened: false,
    Body: "",
    Subject: "",
  });

  const sendMessage = () => {
    axios
      .post("http://localhost:8450/message/data", {...messageDetails,From : items?.username})
      .then((response) => {
        if(response.data.msg === true)
        {
          alert("Message sent");
          handleClose();
        }
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
          <div className="d-flex position-relative">
            <div className={nav ? "navbar" : "navbar1"}>
              <div className="d-flex flex-column  position-absolute top-0">
                <div
                  className="mt-5 d-flex navbar_hover cursor_pointer"
                  onClick={() => {
                    navigate("/home");
                  }}
                >
                  <HomeIcon className="fs-2 icon_color ms-3 me-4 mt-3 mb-3" />
                  {!nav && <p className="fs-6 fw-bold marg">Dashboard</p>}
                </div>
                <div
                  className="d-flex navbar_hover cursor_pointer"
                  onClick={() => {
                    navigate("/sent");
                  }}
                >
                  <MarkEmailReadIcon className="fs-2 icon_color ms-3 me-4 mt-3 mb-3" />
                  {!nav && <p className="fs-6 fw-bold marg">Sent</p>}
                </div>
                <div
                  className="d-flex navbar_hover cursor_pointer"
                  onClick={() => {
                    navigate("/saved");
                  }}
                >
                  <StarRateIcon className="fs-2 icon_color ms-3 me-4 mt-3 mb-3" />
                  {!nav && <p className="fs-6 fw-bold marg">Saved</p>}
                </div>
                <div
                  className="d-flex navbar_hover cursor_pointer"
                  onClick={() => {
                    navigate("/deleted");
                  }}
                >
                  <DeleteIcon className="fs-2 icon_color ms-3 me-4 mt-3 mb-3" />
                  {!nav && <p className="fs-6 fw-bold marg">Deleted</p>}
                </div>
                <div
                  className="d-flex navbar_hover cursor_pointer"
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  <AccountBoxIcon className="fs-2 icon_color ms-3 me-4 mt-3 mb-3" />
                  {!nav && <p className="fs-6 fw-bold marg">Profile</p>}
                </div>
              </div>
              <div className="d-flex position-absolute mb-5 ms-3 bottom-0">
                <div className="icon_add">
                  <AddIcon onClick={handleOpen} />
                  <Modal
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box
                      sx={style}
                      className="d-flex flex-column justify-content-center align-items-center"
                    >
                      <h4 className="text-center fw-bold">Send a Message</h4>
                      <TextField
                        id="standard-basic"
                        label="To"
                        variant="standard"
                        style={{ width: "350px" }}
                        className="mt-3"
                        onChange={(e) => {
                          setMessageDetails({
                            ...messageDetails,
                            To: e.target.value,
                          });
                        }}
                      />
                      <TextField
                        id="standard-basic"
                        label="Subject"
                        variant="standard"
                        style={{ width: "350px" }}
                        className="mt-3"
                        onChange={(e) => {
                          setMessageDetails({
                            ...messageDetails,
                            Subject: e.target.value,
                          });
                        }}
                      />
                      <TextareaAutosize
                        aria-label="minimum height"
                        minRows={3}
                        placeholder="Body"
                        style={{ width: 350 }}
                        className="mt-5 p-2"
                        onChange={(e) => {
                          setMessageDetails({
                            ...messageDetails,
                            Body: e.target.value,
                          });
                        }}
                      />

                      <button
                        className="border-0 btn btn-secondary rounded mt-5 p-3 ps-4 pe-4"
                        onClick={sendMessage}
                      >
                        Send a message
                      </button>
                    </Box>
                  </Modal>
                </div>
              </div>
            </div>
            <div className={nav ? "dashboard" : "dashboard1"}>Profile Page</div>
          </div>
        </div>
      ) : (
        <div>
          <Temp/>
        </div>
      )}
    </div>
  );
};

export default Profile
