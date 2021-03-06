import React, { useState, useEffect } from "react";
import { storage } from "../firebase/firebase";
import { BarsOutlined, LogoutOutlined, CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import db from "../firebase/firebase";
import "../style/header.css";

function Header(props) {
  const [displayProfile, setDisplayProfile] = useState(false);
  const [userName, setuserName] = useState("");
  const [userAge, setuserAge] = useState("");
  const [userGender, setuserGender] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [errorUserAge, seterrorUserAge] = useState("");
  const [errorUserName, seterrorUserName] = useState("");
  const [errorGender, seterrorGender] = useState("");
  const [errorPhoneNumber, seterrorPhoneNumber] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setprogress] = useState(0);
  const [displayImage, setdisplayImage] = useState(false);
  const [displayModalLogOut, setdisplayModalLogOut] = useState(false);
  const [displayChangeImage, setdisplayChangeImage] = useState(false);
  const [displayUpdateSuccess, setdisplayUpdateSuccess] = useState(false);
  const [displayUpdateError, setdisplayUpdateError] = useState(false);
  const [displayHeader, setdisplayHeader] = useState(false);
  const [displayOverlay, setdisplayOverlay] = useState(false);

  const showProfileUser = (element) => {
    setDisplayProfile(!displayProfile);
    setuserName(element.name);
    setuserAge(element.age);
    setuserGender(element.gender);
    setphoneNumber(element.phoneNumber);
    // setEmtyValue();
  };

  const user = props.admin.filter((element) => {
    return element.id === localStorage.getItem("id");
  });

  const submit = () => {
    if (
      errorUserName !== "" ||
      errorUserAge !== "" ||
      errorPhoneNumber !== ""
    ) {
      setdisplayUpdateError(true);
    } else if ( errorUserName === "" ||
    errorUserAge === "" ||
    errorPhoneNumber === "" || userName !== "" || userAge !== "" || phoneNumber !== "") {
      db.collection("user").doc(user[0].id).set({
        image: user[0].image,
        name: userName,
        age: userAge,
        gender: userGender,
        email: user[0].email,
        phoneNumber: phoneNumber,
        password: user[0].password,
      });
      props.getData();
      setdisplayUpdateSuccess(true);
      setDisplayProfile(false);
    } else {
        setdisplayUpdateError(true);
      }
  };

  const checkUserName = () => {
    if (userName === "") {
      seterrorUserName("Kh??ng ???????c ????? tr???ng");
    } else {
      seterrorUserName("");
    }
  };

  const checkUserAge = () => {
    if (userAge === "") {
      seterrorUserAge("Kh??ng ???????c ????? tr???ng");
    } else if (userAge.length > 3 || userAge > 200) {
      seterrorUserAge("Tu???i kh??ng h???p l???");
    } else {
      seterrorUserAge("");
    }
  };

  const checkUserGender = () => {
    if (userGender === "") {
      seterrorGender("Kh??ng ???????c ????? tr???ng");
    } else {
      seterrorGender("");
    }
  };

  const checkPhoneNumber = () => {
    if (phoneNumber === "") {
      seterrorPhoneNumber("Kh??ng ???????c ????? tr???ng");
    } else if (phoneNumber.length < 10 || phoneNumber.length > 11) {
      seterrorPhoneNumber("S??? ??i???n tho???i kh??ng h???p l???");
    } else {
      seterrorPhoneNumber("");
    }
  };

  const handleChangeGender = (e) => {
    setuserGender(e.target.value);
  };

  const handleChangeFile = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    const upLoadTask = storage.ref(`images/${image.name}`).put(image);
    upLoadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setprogress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // seturl(url)
            updateImage(url);
          });
      }
    );
  };

  const updateImage = async (url) => {
    await db.collection("user").doc(user[0].id).update({
      image: url,
    });
    props.getData();
    setdisplayChangeImage(true);
    setdisplayImage(false);
  };

  const toggleModalImage = () => {
    setdisplayImage(!displayImage);
  };

  const toggleModalLogOut = () => {
    setdisplayModalLogOut(!displayModalLogOut);
  };

  const showHeader = () => {
    setdisplayHeader(!displayHeader);
    setdisplayOverlay(!displayOverlay);
  };

  return (
    <div>
      {displayOverlay && <div onClick={showHeader} className="overlay"></div>}
      <div className="showUserInfo_Mobile" onClick={showHeader}>
        <BarsOutlined />
      </div>
      <div className="showUserInfo_PC" onClick={showHeader}>
        <img
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
          }}
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt=""
        />
      </div>

      {displayModalLogOut && (
        <div className="modal_logOut">
          <div className="modal_content">
            <h2>B???n c?? ch???c mu???n ????ng xu???t?</h2>
            <Link to="/">
              <button>C??</button>
            </Link>
            <button onClick={toggleModalLogOut}>Kh??ng</button>
          </div>
        </div>
      )}

      {displayHeader && (
        <div className="header">
          <div className="header_pc">
            <div className="account">
              <div className="inforAdmin">
                {user.map((element, index) => {
                  return (
                    <div key={index} className="infor center">
                      <div className="close_header">
                        <CloseOutlined onClick={showHeader} />
                      </div>

                      <div className="userImage ">
                        <h2>Xin ch??o</h2>
                        {element.image ? (
                          <img src={element.image} alt="" />
                        ) : (
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                            alt=""
                          />
                        )}

                        <p style={{ color: "red" }}>
                          {user.length > 0 ? user[0].name : " "}
                        </p>

                        <h3
                          onClick={toggleModalImage}
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          Thay ?????i ???nh
                        </h3>
                        {displayImage && (
                          <div className="modalImage">
                            <div
                              className="modal_content"
                              style={{
                                padding: "20px",
                                width: "300px",
                              }}
                            >
                              {" "}
                              <progress value={progress} max="100" />
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(event) => handleChangeFile(event)}
                              />
                              <button onClick={handleUpload}>Thay ?????i</button>
                              <button onClick={toggleModalImage}>Tho??t</button>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="name">
                        <b>H??? v?? t??n: </b>
                        {element.name}
                      </div>
                      <div className="age">
                        <b>Tu???i:</b> {element.age}
                      </div>
                      <div className="gender">
                        <b>Gi???i t??nh: </b> {element.gender}
                      </div>
                      <div
                        style={{ marginBottom: "10px" }}
                        className="phoneNumber"
                      >
                        <b>S??? ??i???n tho???i:</b> {element.phoneNumber}{" "}
                      </div>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => showProfileUser(element)}
                      >
                        {" "}
                        S???a ?????i th??ng tin
                      </span>
                      <p className="Out" onClick={toggleModalLogOut}>
                        {" "}
                        ????ng xu???t
                        <LogoutOutlined style={{ marginLeft: "5px" }} />
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Edit Profile */}
              {displayProfile && (
                <>
                  <div className="updateUser">
                    <div className="modal_content">
                      <div className="userImage">
                        {user[0].image ? (
                          <img src={user[0].image} alt="" />
                        ) : (
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                            alt=""
                          />
                        )}
                      </div>
                      <div className="flex">
                        <div>
                          <input
                            type="text"
                            className="userName"
                            placeholder="T??n ng?????i d??ng"
                            value={userName}
                            onBlur={checkUserName}
                            onChange={(e) => setuserName(e.target.value)}
                          />{" "}
                          <small>{errorUserName}</small>
                          <input
                            type="text"
                            className="userAge"
                            placeholder="Tu???i"
                            value={userAge}
                            onBlur={checkUserAge}
                            onChange={(e) => setuserAge(e.target.value)}
                          />{" "}
                          <small>{errorUserAge}</small>
                        </div>

                        <div>
                          <select
                            value={userGender}
                            onBlur={checkUserGender}
                            onChange={(e) => handleChangeGender(e)}
                          >
                            <option value="">Ch???n gi???i t??nh</option>
                            <option value="Nam">Nam</option>
                            <option value="N???">N???</option>
                          </select>{" "}
                          <small>{errorGender}</small>
                        </div>
                      </div>
                      <input
                        type="number"
                        className="phoneNumber"
                        onBlur={checkPhoneNumber}
                        placeholder="S??? ??i???n tho???i"
                        value={phoneNumber}
                        onChange={(e) => setphoneNumber(e.target.value)}
                      />
                      <small>{errorPhoneNumber}</small>

                      <button onClick={submit}>C???p nh???t</button>
                      <button onClick={() => setDisplayProfile(false)}>
                        Tho??t
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {displayUpdateSuccess && (
        <div className="modalUpdateSuccess">
          <div className="modal_content">
            <h2>S???a th??nh c??ng</h2>
            <button onClick={() => setdisplayUpdateSuccess(false)}>
              ?????ng ??
            </button>
          </div>
        </div>
      )}
      {displayUpdateError && (
        <div className="modalUpdateSuccess">
          <div className="modal_content">
            <h2>Vui l??ng ki???m tra l???i th??ng tin</h2>
            <button onClick={() => setdisplayUpdateError(false)}>?????ng ??</button>
          </div>
        </div>
      )}
       {displayChangeImage && (
        <div className="modalUpdateSuccess">
          <div className="modal_content">
            <h2>Thay ?????i ???nh th??nh c??ng</h2>
            <button onClick={() => setdisplayChangeImage(false)}>?????ng ??</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
