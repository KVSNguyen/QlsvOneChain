import React, { useState } from "react";
import { CloseOutlined, LogoutOutlined } from "@ant-design/icons";

function UpdateStudent(props) {
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
  const [dateJoinUpdate, setDateJoinUpdate] = useState();

  
  //  Check Value Input
  const checkID = () => {
    if (studentIDUpdate.length === 0) {
      seterrorIDUpdate("Không được để trống");
    } else {
      seterrorIDUpdate("");
    }
  };
  const checkName = () => {
    if (studentNameUpdate.length === 0) {
      seterrorNameUpdate("Không được để trống");
    } else if (studentNameUpdate.length > 40) {
      seterrorNameUpdate("Vượt quá kí tự cho phép");
    } else {
      seterrorNameUpdate("");
    }
  };
  const checkStatus = () => {
    if (studentStatusUpdate.length === 0) {
      seterrorStatusUpdate("Không được để trống");
    } else {
      seterrorStatusUpdate("");
    }
  };
  const checkGenderUpdate = () => {
    if (genderUpdate.length === 0) {
      seterrorGenderUpdate("Không được để trống");
    } else {
      seterrorGenderUpdate("");
    }
  };
  const checkPhoneNumberUpdate = () => {
    if (phoneNumberUpdate.length === 0) {
      seterrorPhoneNumberUpdate("Không được để trống");
    } else if (phoneNumberUpdate.length < 10 || phoneNumberUpdate.length > 11) {
      seterrorPhoneNumberUpdate("Số điện thoại không hợp lệ");
    } else {
      seterrorPhoneNumberUpdate("");
    }
  };
  const checkMajor = () => {
    if (studentMajorUpdate.length === 0) {
      seterrorMajorUpdate("Không được để trống");
    } else {
      seterrorMajorUpdate("");
    }
  };
  const checkAge = () => {
    if (studentAgeUpdate.length === 0) {
      seterrorAgeUpdate("Không được để trống");
    } else {
      seterrorAgeUpdate("");
    }
  };
  const checkHometown = () => {
    if (studentHomeTownUpdate.length === 0) {
      seterrorHometownUpdate("Không được để trống");
    } else {
      seterrorHometownUpdate("");
    }
  };
  const checkEmail = () => {
    const regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(
      studentEmailUpdate
    );
    if (studentEmailUpdate === "") {
      seterrorEmail("Không được để trống");
    } else if (!regexEmail) {
      seterrorEmail("Email không hợp lệ");
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

  return (
    <div className="updateStudent">
      <div className="modal_content">
        <h2>Sửa Sinh Viên </h2>
        <span onClick={props.showModalUpdate}>
          <CloseOutlined />
        </span>
        <div className="flex">
          <div>
            <input
              disabled
              type="text"
              className="studentIDUpdate"
              placeholder="Mã sinh viên"
              value={studentIDUpdate}
              onBlur={checkID}
              onChange={(e) => setstudentIDUpdate(e.target.value)}
            />{" "}
            <small>{errorIDUpdate}</small>
            <input
              type="text"
              className="studentNameUpdate"
              placeholder="Tên sinh viên"
              value={studentNameUpdate}
              onBlur={checkName}
              onChange={(e) => setStudentNameUpdate(e.target.value)}
            />{" "}
            <small>{errorNameUpdate}</small>
            <input
              type="number"
              className="studentAgeUpdate"
              placeholder="Tuổi"
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
              <option value="">Chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>{" "}
            <small>{errorGenderUpdate}</small>
            <select
              className="studentStatusUpdate"
              value={studentStatusUpdate}
              onBlur={checkStatus}
              onChange={(e) => handleChangeStatus(e)}
            >
              <option value="">Chọn trạng thái</option>
              <option value="Đang học">Đang học</option>
              <option value="Đã học xong">Đã học xong</option>
              <option value="Đã nghỉ học">Đã nghỉ học</option>
              <option value="Đình chỉ">Đình chỉ</option>
              <option value="Bảo lưu">Bảo lưu</option>
            </select>
            <small>{errorStatusUpdate}</small>
            <select
              className="studentMajorUpdate"
              value={studentMajorUpdate}
              onBlur={checkMajor}
              onChange={(e) => handleChangeMajor(e)}
            >
              <option value="">Chọn ngành</option>
              <option value="CNTT">CNTT</option>
              <option value="Dược">Dược</option>
              <option value="Ngôn ngữ Anh">Ngôn ngữ Anh</option>
              <option value="Du lịch">Du lịch</option>
              <option value="Quản trị khách sạn">Quản trị khách sạn</option>
              <option value="Công nghệ ô tô">Công nghệ ô tô</option>
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
          placeholder="Số điện thoại"
          value={phoneNumberUpdate}
          onBlur={checkPhoneNumberUpdate}
          onChange={(e) => setphoneNumberUpdate(e.target.value)}
        />
        <small>{errorPhoneNumberUpdate}</small>
        <input
          type="text"
          className="studentHomeTownUpdate"
          placeholder="Quê quán"
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
            props.updateData();
          }}
        >
          Sửa
        </button>
        <button onClick={props.toggleModalUpdate}>Thoát</button>
      </div>
    </div>
  );
}

export default UpdateStudent;
