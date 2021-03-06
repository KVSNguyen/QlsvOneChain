import React, { useState } from "react";
import db from "../../firebase/firebase";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CloseOutlined,
  LogoutOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { storage } from "../../firebase/firebase";
import { Pagination } from "antd";
import TableStudent from "./TableStudent";
import GridStudent from "./GridStudent";
import AddStudent from "../RCUDStudent/AddStudent";
import TableMobile from "./TableMoble";

function ListStudent(props) {
  const [student, setstudent] = useState([]);
  const events = db.collection("student");
  const [displayModalDelete, setDisplayModalDelete] = useState(false);
  const [displayModalUpdate, setDisplayModalUpdate] = useState(false);
  const [currentIdDelete, setCurrentIdDelete] = useState();
  const [studentIDUpdate, setstudentIDUpdate] = useState("");
  const [studentNameUpdate, setStudentNameUpdate] = useState("");
  const [studentEmailUpdate, setstudentEmailUpdate] = useState("");
  const [genderUpdate, setgenderUpdate] = useState("");
  const [studentAgeUpdate, setstudentAgeUpdate] = useState("");
  const [studentStatusUpdate, setstudentStatusUpdate] = useState("");
  const [studentMajorUpdate, setstudentMajorUpdate] = useState("");
  const [phoneNumberUpdate, setphoneNumberUpdate] = useState("");
  const [studentHomeTownUpdate, setstudentHomeTownUpdate] = useState("");
  const [errorIDUpdate, seterrorIDUpdate] = useState("");
  const [errorNameUpdate, seterrorNameUpdate] = useState("");
  const [errorStatusUpdate, seterrorStatusUpdate] = useState("");
  const [errorEmail, seterrorEmail] = useState("");
  const [errorMajorUpdate, seterrorMajorUpdate] = useState("");
  const [errorAgeUpdate, seterrorAgeUpdate] = useState("");
  const [errorGenderUpdate, seterrorGenderUpdate] = useState("");
  const [errorPhoneNumberUpdate, seterrorPhoneNumberUpdate] = useState("");
  const [errorHometownUpdate, seterrorHometownUpdate] = useState("");
  const [currentIdUpdate, setcurrentIdUpdate] = useState("");
  const filterStatus = "";
  const fillterMajor = "";
  const [searchData, setSearchData] = useState("");
  const [currentIdImage, setcurrentIdImage] = useState();
  const [inforStudent, setInforStudent] = useState(false);
  const [displayTable, setDisplayTable] = useState(true);
  const [displayGrid, setDisplayGrid] = useState(false);
  const [displayImage, setdisplayImage] = useState(false);
  const [displayModalLogOut, setdisplayModalLogOut] = useState(false);
  const [displayModalAdd, setdisplayModalAdd] = useState(false);
  const [detailStudent, setDetailStudent] = useState(false);
  const [displayUpdateSuccess, setdisplayUpdateSuccess] = useState(false);
  const [displayUpdateError, setdisplayUpdateError] = useState(false);
  const [displayChangeImage, setdisplayChangeImage] = useState(false);
  const [displayDontFindStudent, setdisplayDontFindStudent] = useState(false);
  const [image, setImage] = useState(null);
  const [proccess, setProccess] = useState(0);
  const [dateJoinUpdate, setDateJoinUpdate] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const studentPerPage = 5

  const indexOfLastStudent = currentPage * studentPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentPerPage;
  const currentStudent = student.slice(indexOfFirstStudent, indexOfLastStudent);

  //Chuy???n trang - Paginaion
  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  const showModalUpdate = (element) => {
    setInforStudent(false);
    setcurrentIdUpdate(element.id);
    setstudentIDUpdate(element.code);
    setStudentNameUpdate(element.name);
    setstudentStatusUpdate(element.status);
    setstudentAgeUpdate(element.age);
    setstudentStatusUpdate(element.status);
    setstudentMajorUpdate(element.major);
    setDateJoinUpdate(element.dateJoin);
    setstudentEmailUpdate(element.email);
    setgenderUpdate(element.gender);
    setphoneNumberUpdate(element.phoneNumber);
    setstudentHomeTownUpdate(element.homeTown);
    setDisplayModalUpdate(!displayModalUpdate);
    setEmtyErrorValueUpdate();
  };

  const showModalDelete = (id) => {
    setInforStudent(false);
    setCurrentIdDelete(id);
    setDisplayModalDelete(!displayModalDelete);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    events.get().then((querySnapshot) => {
      const tempDoc = [];
      querySnapshot.forEach((doc) => {
        tempDoc.push({ id: doc.id, ...doc.data() });
      });
      setstudent(tempDoc);
    });
  };

  // Submit form
  const updateData = (id) => {
    if (
      errorIDUpdate === "" &&
      errorNameUpdate === "" &&
      errorAgeUpdate === "" &&
      errorStatusUpdate === "" &&
      errorMajorUpdate === "" &&
      errorGenderUpdate === "" &&
      errorPhoneNumberUpdate === "" &&
      errorHometownUpdate === "" &&
      studentIDUpdate !== "" &&
      studentNameUpdate !== "" &&
      genderUpdate !== "" &&
      studentAgeUpdate !== "" &&
      studentStatusUpdate !== "" &&
      studentMajorUpdate !== "" &&
      phoneNumberUpdate !== "" &&
      studentHomeTownUpdate !== ""
    ) {
      db.collection("student").doc(currentIdUpdate).update({
        age: studentAgeUpdate,
        status: studentStatusUpdate,
        code: studentIDUpdate,
        email: studentEmailUpdate,
        gender: genderUpdate,
        dateJoin: dateJoinUpdate,
        homeTown: studentHomeTownUpdate,
        major: studentMajorUpdate,
        name: studentNameUpdate,
        phoneNumber: phoneNumberUpdate,
      });
      getData();
      setdisplayUpdateSuccess(true);
      setDisplayModalUpdate(false);
    }
    if (
      studentIDUpdate === "" &&
      studentNameUpdate === "" &&
      genderUpdate === "" &&
      studentAgeUpdate === "" &&
      studentStatusUpdate === "" &&
      studentMajorUpdate === "" &&
      phoneNumberUpdate === "" &&
      studentHomeTownUpdate === ""
    ) {
      setdisplayUpdateError(true);
    }
  };

  const deleteStudent = async (id) => {
    await db.collection("student").doc(id).delete();
    showModalDelete();
    getData();
  };

  //  Check Emty Input
  const checkID = () => {
    if (studentIDUpdate.length === 0) {
      seterrorIDUpdate("Kh??ng ???????c ????? tr???ng");
    } else if (studentIDUpdate.length < 4 || studentIDUpdate.length > 8) {
      seterrorIDUpdate("Nh???p t??? 4-8 k?? t???");
    } else {
      seterrorIDUpdate("");
    }
  };

  const checkName = () => {
    if (studentNameUpdate.length === 0) {
      seterrorNameUpdate("Kh??ng ???????c ????? tr???ng");
    } else if (studentNameUpdate.length > 40 || studentNameUpdate.length <= 1) {
      seterrorNameUpdate("T??n kh??ng h???p l???");
    } else {
      seterrorNameUpdate("");
    }
  };

  const checkStatus = () => {
    if (studentStatusUpdate.length === 0) {
      seterrorStatusUpdate("Kh??ng ???????c ????? tr???ng");
    } else {
      seterrorStatusUpdate("");
    }
  };

  const checkGenderUpdate = () => {
    if (genderUpdate.length === 0) {
      seterrorGenderUpdate("Kh??ng ???????c ????? tr???ng");
    } else {
      seterrorGenderUpdate("");
    }
  };
  const checkPhoneNumberUpdate = () => {
    const regexPhoneNumber =
      /^(\+?[01])?[-.\s]?\(?[1-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(
        phoneNumberUpdate
      );
    if (phoneNumberUpdate === "") {
      seterrorPhoneNumberUpdate("Kh??ng ???????c ????? tr???ng");
    } else if (
      !regexPhoneNumber ||
      phoneNumberUpdate.length < 10 ||
      phoneNumberUpdate.length > 12
    ) {
      seterrorPhoneNumberUpdate("S??? ??i???n tho???i kh??ng h???p l???");
    } else {
      seterrorPhoneNumberUpdate("");
    }
  };
  const checkMajor = () => {
    if (studentMajorUpdate.length === 0) {
      seterrorMajorUpdate("Kh??ng ???????c ????? tr???ng");
    } else {
      seterrorMajorUpdate("");
    }
  };

  const checkAge = () => {
    if (studentAgeUpdate.length === 0) {
      seterrorAgeUpdate("Kh??ng ???????c ????? tr???ng");
    } else {
      seterrorAgeUpdate("");
    }
  };

  const checkHometown = () => {
    if (studentHomeTownUpdate.length === 0) {
      seterrorHometownUpdate("Kh??ng ???????c ????? tr???ng");
    } else {
      seterrorHometownUpdate("");
    }
  };

  const checkEmail = () => {
    const regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(
      studentEmailUpdate
    );
    if (studentEmailUpdate === "") {
      seterrorEmail("Kh??ng ???????c ????? tr???ng");
    } else if (!regexEmail) {
      seterrorEmail("Email kh??ng h???p l???");
    } else {
      seterrorEmail("");
    }
  };

  //Change value when choose this
  const handleChangeGenderUpdate = (e) => {
    setgenderUpdate(e.target.value);
  };

  const handleChangeMajor = (e) => {
    setstudentMajorUpdate(e.target.value);
  };

  const handleChangeStatus = (e) => {
    setstudentStatusUpdate(e.target.value);
  };

  const setEmtyErrorValueUpdate = () => {
    seterrorIDUpdate("");
    seterrorNameUpdate("");
    seterrorAgeUpdate("");
    seterrorStatusUpdate("");
    seterrorGenderUpdate("");
    seterrorHometownUpdate("");
    seterrorMajorUpdate("");
    seterrorPhoneNumberUpdate("");
  };

  //fillter Student
  const handleChangeStatusFilter = async (e) => {
    const result = await fillterStudent("status", e.target.value);
    setstudent(result);
    setInforStudent(false);
  };

  const handleChangeMajorFilter = async (e) => {
    const result = await fillterStudent("major", e.target.value);
    setstudent(result);
    setInforStudent(false);
  };

  const searchStudent = async () => {
    const result = await fillterStudent("code", searchData);
    if (result.length === 0) {
      setdisplayDontFindStudent(true);
      getData();
    } else if (searchData === "") {
      setdisplayDontFindStudent(true);
    } else {
      setstudent(result);
    }
    setSearchData("");
    setInforStudent(false);
  };

  const showInforStudent = (id) => {
    const result = student.filter((element) => {
      return element.id === id;
    });
    setDetailStudent(result);
    setInforStudent(true);
  };

  const reloadpage = () => {
    getData();
    setInforStudent(false);
  };

  const fillterStudent = async (key, value) => {
    const tempDoc = [];
    await db
      .collection("student")
      .where(key, "==", value)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          tempDoc.push({ id: doc.id, ...doc.data() });
        });
      })
      .catch((error) => {
        console.log("L???i l???y d??? li???u: ", error);
      });
    return tempDoc;
  };

  const showGridStudent = () => {
    setDisplayTable(false);
    setDisplayGrid(true);
    setInforStudent(false);
  };

  const showTableStudent = () => {
    setDisplayGrid(false);
    setDisplayTable(true);
    setInforStudent(false);
  };

  const handleChangeFile = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  //Up Load Image
  const handleUpload = () => {
    console.log(currentIdImage);
    const upLoadTask = storage.ref(`images/${image.name}`).put(image);
    upLoadTask.on(
      "state_changed",
      (snapshot) => {
        const proccess = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProccess(proccess);
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
            getData();
          });
      }
    );
  };

  const toggleModalImage = (id) => {
    setcurrentIdImage(id);
    setdisplayImage(!displayImage);
  };

  const toggleModalLogOut = () => {
    setdisplayModalLogOut(!displayModalLogOut);
  };

  const updateImage = async (url) => {
    await db.collection("student").doc(currentIdImage).update({
      image: url,
    });
    setdisplayChangeImage(true);
    getData();
    setdisplayImage(false);
  };

  const toggleModalAdd = () => {
    setdisplayModalAdd(!displayModalAdd);
    getData();
  };

  return (
    <div className="container ">
      <div className="option flex">
        <div className="user"></div>
        <h1
          style={{
            marginBottom: "0",
          }}
        >
          Qu???n l?? sinh vi??n
        </h1>
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
        <p className="LogOut" onClick={toggleModalLogOut}>
          {" "}
          ????ng xu???t
          <LogoutOutlined style={{ marginLeft: "5px" }} />
        </p>
      </div>

      <div
        style={{
          margin: "0 2%",
        }}
      >
        <div>
          <div className="theme">
            {displayGrid ? (
              <div
                style={{
                  color: "rgb(252, 52, 62)",
                  border: "1px solid rgb(252, 52, 62)",
                }}
                onClick={showGridStudent}
              >
                Hi???n th??? sinh vi??n d?????i d???ng th???
              </div>
            ) : (
              <div onClick={showGridStudent}>
                Hi???n th??? sinh vi??n d?????i d???ng th???
              </div>
            )}

            {displayTable ? (
              <div
                style={{
                  color: "rgb(252, 52, 62)",
                  border: "1px solid rgb(252, 52, 62)",
                }}
                onClick={showTableStudent}
              >
                Hi???n th??? sinh vi??n d?????i d???ng b???ng
              </div>
            ) : (
              <div onClick={showTableStudent}>
                Hi???n th??? sinh vi??n d?????i d???ng b???ng
              </div>
            )}
          </div>

          {/* search StudentByCode */}
          <div className="flex" style={{}}>
            <div className="searchStudent">
              <input
                className="searchByCode"
                style={{
                  outline: "none",
                  padding: "5px 7px",
                }}
                value={searchData}
                onChange={(e) => {
                  setSearchData(e.target.value);
                }}
                type="text"
                placeholder="Nh???p m?? sinh vi??n"
              />
              <button className="btnSearchByCode" onClick={searchStudent}>
                <SearchOutlined />
              </button>
            </div>

            <div className="filterStudent ">
              <select
                value={filterStatus}
                onChange={(e) => handleChangeStatusFilter(e)}
              >
                <option value="">Ch???n tr???ng th??i</option>
                <option value="??ang h???c">??ang h???c</option>
                <option value="???? h???c xong">???? h???c xong ???</option>
                <option value="???? ngh??? h???c">???? ngh??? h???c</option>
                <option value="????nh ch???">????nh ch???</option>
                <option value="B???o l??u">B???o l??u</option>
              </select>

              <select
                value={fillterMajor}
                onChange={(e) => handleChangeMajorFilter(e)}
                name=""
                id=""
              >
                <option value="">Ch???n ng??nh h???c</option>
                <option value="CNTT">CNTT</option>
                <option value="D?????c">D?????c</option>
                <option value="Ng??n ng??? Anh">Ng??n ng??? Anh</option>
                <option value="Du l???ch">Du l???ch</option>
                <option value="Qu???n tr??? kh??ch s???n">Qu???n tr??? kh??ch s???n</option>
                <option value="C??ng ngh??? ?? t??">C??ng ngh??? ?? t??</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          {inforStudent &&
            detailStudent.map((element, index) => {
              return (
                <div key={index} className="studentDetail userImage">
                   
                    <div
                      className="modal_content "
                      style={{ position: "relative" }}
                    >
                      <CloseOutlined
                        style={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                          fontSize: "20px",
                          cursor: "pointer",
                        }}
                        onClick={() => setInforStudent(false)}
                      />
                      <h2 style={{ fontSize: "19px" }}>Th??ng tin sinh vi??n</h2>
                      {element.image ? (
                        <img src={element.image} alt="" />
                      ) : (
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                          alt=""
                        />
                      )}
                      <h3
                        onClick={() => toggleModalImage(element.id)}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        Thay ?????i ???nh
                      </h3>
                      <div>
                        <strong>M?? sinh vi??n: </strong> {element.code}
                      </div>
                      <div>
                        <strong>H??? t??n: </strong> {element.name}
                      </div>
                      <div>
                        <strong>Tu???i: </strong> {element.age}
                      </div>
                      <div>
                        <strong>Tr???ng th??i: </strong>
                        {element.status}
                      </div>
                      <div>
                        <strong>Email: </strong> {element.email}
                      </div>
                      <div>
                        <strong>Ng??nh h???c: </strong> {element.major}
                      </div>
                      <div>
                        <strong>S??? ??i???n tho???i: </strong> {element.phoneNumber}
                      </div>
                      <div>
                        <strong>Ng??y tham gia: </strong> {element.dateJoin}
                      </div>
                      <div>
                        <strong>Qu??n qu??n: </strong> {element.homeTown}
                      </div>
                      <button onClick={() => showModalUpdate(element)}>
                        {" "}
                        S???a th??ng tin
                      </button>
                    </div>
                  </div>
                
              );
            })}
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
                <progress value={proccess} max="100" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleChangeFile(event)}
                />
                <div className="flex">
                  <button onClick={handleUpload}>Thay ?????i</button>
                  <button onClick={toggleModalImage}>Tho??t</button>
                </div>
              </div>
            </div>
          )}
        </div>
        <form action="">
          <div className="title flex">
            <h2 onClick={reloadpage}>
              Danh s??ch sinh vi??n
              <span>Reload</span>
            </h2>
            <button
              onClick={() => setdisplayModalAdd(!displayModalAdd)}
              className="btnAdd"
              type="button"
            >
              Th??m m???i +
            </button>
          </div>

          {displayTable && (
            <>
              <TableStudent
                studentTable={currentStudent}
                showInforStudent={showInforStudent}
                showModalUpdate={showModalUpdate}
                showModalDelete={showModalDelete}
              />

              <TableMobile
                studentTable={currentStudent}
                showInforStudent={showInforStudent}
                showModalUpdate={showModalUpdate}
                showModalDelete={showModalDelete}
              />
            </>
          )}

          {displayGrid && (
            <div>
              <GridStudent
                studentGrid={currentStudent}
                toggleModalImage={toggleModalImage}
                showInforStudent={showInforStudent}
                showModalDelete={showModalDelete}
              />
            </div>
          )}
          <div style={{ marginBottom: "10px" }}>
            <Pagination className="pagination"
              defaultCurrent={currentPage}
              total={student.length}
              onChange={onChangePage}
              pageSize={5}
            />
            ;
          </div>
        </form>
      </div>

      {/* Modal Add */}
      {displayModalAdd && <AddStudent toggleModalAdd={toggleModalAdd} />}

      {/* Modal Delete */}
      {displayModalDelete && currentIdDelete && (
        <div className="deleteStudent">
          <div className="modal_content p_20">
            <h2>X??a kh???i danh s??ch?</h2>
            <div className="flex">
              <button
                type="button"
                onClick={() => {
                  deleteStudent(currentIdDelete);
                }}
              >
                C??
              </button>
              <button type="button" onClick={showModalDelete}>
                Kh??ng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Update */}
      {displayModalUpdate && currentIdUpdate && (
        <div className="updateStudent">
          <div className="modal_content">
            <h2>S???a Sinh Vi??n </h2>
            <span onClick={showModalUpdate}>
              <CloseOutlined />
            </span>
            <div className="flex">
              <div>
                <input
                  disabled
                  type="text"
                  className="studentIDUpdate"
                  placeholder="M?? sinh vi??n"
                  value={studentIDUpdate}
                  onBlur={checkID}
                  onChange={(e) => setstudentIDUpdate(e.target.value)}
                />{" "}
                <small>{errorIDUpdate}</small>
                <input
                  type="text"
                  className="studentNameUpdate"
                  placeholder="T??n sinh vi??n"
                  value={studentNameUpdate}
                  onBlur={checkName}
                  onChange={(e) => setStudentNameUpdate(e.target.value)}
                />{" "}
                <small>{errorNameUpdate}</small>
                <input
                  type="number"
                  className="studentAgeUpdate"
                  placeholder="Tu???i"
                  value={studentAgeUpdate}
                  onBlur={checkAge}
                  onChange={(e) => setstudentAgeUpdate(e.target.value)}
                />{" "}
                <small>{errorAgeUpdate}</small>
              </div>

              <div>
                <select
                  value={genderUpdate}
                  onBlur={checkGenderUpdate}
                  onChange={(e) => handleChangeGenderUpdate(e)}
                >
                  <option value="">Ch???n gi???i t??nh</option>
                  <option value="Nam">Nam</option>
                  <option value="N???">N???</option>
                </select>{" "}
                <small>{errorGenderUpdate}</small>
                <select
                  className="studentStatusUpdate"
                  value={studentStatusUpdate}
                  onBlur={checkStatus}
                  onChange={(e) => handleChangeStatus(e)}
                >
                  <option value="">Ch???n tr???ng th??i</option>
                  <option value="??ang h???c">??ang h???c</option>
                  <option value="???? h???c xong">???? h???c xong</option>
                  <option value="???? ngh??? h???c">???? ngh??? h???c</option>
                  <option value="????nh ch???">????nh ch???</option>
                  <option value="B???o l??u">B???o l??u</option>
                </select>
                <small>{errorStatusUpdate}</small>
                <select
                  className="studentMajorUpdate"
                  value={studentMajorUpdate}
                  onBlur={checkMajor}
                  onChange={(e) => handleChangeMajor(e)}
                >
                  <option value="">Ch???n ng??nh</option>
                  <option value="CNTT">CNTT</option>
                  <option value="D?????c">D?????c</option>
                  <option value="Ng??n ng??? Anh">Ng??n ng??? Anh</option>
                  <option value="Du l???ch">Du l???ch</option>
                  <option value="Qu???n tr??? kh??ch s???n">Qu???n tr??? kh??ch s???n</option>
                  <option value="C??ng ngh??? ?? t??">C??ng ngh??? ?? t??</option>
                </select>
                <small>{errorMajorUpdate}</small>
              </div>
            </div>
            <input
              type="email"
              placeholder="Email"
              value={studentEmailUpdate}
              onBlur={checkEmail}
              onChange={(e) => setstudentEmailUpdate(e.target.value)}
            />
            <small>{errorEmail}</small>
            <input
              type="number"
              className="phoneNumberUpdate"
              placeholder="S??? ??i???n tho???i"
              value={phoneNumberUpdate}
              onBlur={checkPhoneNumberUpdate}
              onChange={(e) => setphoneNumberUpdate(e.target.value)}
            />
            <small>{errorPhoneNumberUpdate}</small>
            <input
              type="text"
              className="studentHomeTownUpdate"
              placeholder="Qu?? qu??n"
              onBlur={checkHometown}
              value={studentHomeTownUpdate}
              onChange={(e) => setstudentHomeTownUpdate(e.target.value)}
            />
            <small>{errorHometownUpdate}</small>

            <input
              type="date"
              className="studentHomeTownUpdate"
              value={dateJoinUpdate}
              onChange={(e) => setDateJoinUpdate(e.target.value)}
            />

            <button
              onClick={() => {
                updateData();
              }}
            >
              S???a
            </button>
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
      {displayDontFindStudent && (
        <div className="modalUpdateSuccess">
          <div className="modal_content">
            <h2>Kh??ng t??m th???y sinh vi??n</h2>
            <button onClick={() => setdisplayDontFindStudent(false)}>
              ?????ng ??
            </button>
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

export default ListStudent;
