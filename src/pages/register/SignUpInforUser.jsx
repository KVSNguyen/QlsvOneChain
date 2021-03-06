import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import db from "../../firebase/firebase";

function SignUpInforUser(props) {
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [errorUserName, seterrorUserName] = useState("");
  const [errorUserAge, seterrorUserAge] = useState("");
  const [erroUserGender, seterroUserGender] = useState("");
  const [cookie] = useCookies(["user"]);
  const [errorUserPhoneNumber, seterrorUserPhoneNumber] = useState("");
  const [userSignUp, setUserSignUp] = useState([]);
  const [displayErrorInput, setdisplayErrorInput] = useState(false);
  const events = db.collection("user");
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    events.get().then((querySnapshot) => {
      const tempDoc = [];
      querySnapshot.forEach((doc) => {
        tempDoc.push({ id: doc.id, ...doc.data() });
        setUserSignUp(tempDoc);
      });
    });
  };

  const userAccount = userSignUp.filter((element) => {
    return element.id === cookie.id;
  });

  const submit = async () => {
    if (
      (errorUserName === "" &&
        errorUserAge === "" &&
        erroUserGender !== "" &&
        errorUserPhoneNumber === "") ||
      userName !== "" ||
      userAge !== "" ||
      userGender !== "" ||
      userPhoneNumber !== ""
    ) {
      await db.collection("user").doc(userAccount[0].id).set({
        image: null,
        email: userAccount[0].email,
        name: userName,
        gender: userGender,
        age: userAge,
        phoneNumber: userPhoneNumber,
      });
      navigate("/SignUpPassword");
    } else {
      setdisplayErrorInput(true);
    }
  };

  const checkName = () => {
    let result = /^[a-zA-Z ]+$/.test(userName);
    if (userName === "") {
      seterrorUserName("Kh??ng ???????c ????? tr???ng");
    } else if (!result || userName.length <= 1) {
      seterrorUserName("T??n ng?????i d??ng kh??ng h???p l???");
    } else {
      seterrorUserName("");
    }
  };

  const checkAge = () => {
    if (userAge === "") {
      seterrorUserAge("Kh??ng ???????c ????? tr???ng");
    } else if (userAge < 0 || userAge > 150) {
      seterrorUserAge("Tu???i kh??ng h???p l???");
    } else {
      seterrorUserAge("");
    }
  };
  const checkGender = () => {
    if (userGender === "") {
      seterroUserGender("Kh??ng ???????c ????? tr???ng");
    } else {
      seterroUserGender("");
    }
  };
  const checkPhoneNumber = () => {
    const regexPhoneNumber =
      /^(\+?[01])?[-.\s]?\(?[1-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(
        userPhoneNumber
      );
    if (userPhoneNumber === "") {
      seterrorUserPhoneNumber("Kh??ng ???????c ????? tr???ng");
    } else if (!regexPhoneNumber || userPhoneNumber.length < 10 || userPhoneNumber.length > 12) {
      seterrorUserPhoneNumber("S??? ??i???n tho???i kh??ng h???p l???");
    } else {
      seterrorUserPhoneNumber("");
    }
  };

  const deleteEmail = async () => {
    await db.collection("user").doc(cookie.id).delete();
  };
  const handleChangeGender = (e) => {
    setUserGender(e.target.value);
  };

  return (
    <div>
      <div>
        <div className="sign_up">
          <h2>
            {" "}
            <UserOutlined style={{ display: "block" }} /> ????ng K??{" "}
          </h2>
          <p>Nh???p t??n</p>
          <input
            type="text"
            className="userName_signUp"
            placeholder="Nh???p t??n c???a b???n"
            value={userName}
            onBlur={checkName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <small>{errorUserName}</small>
          <p>Nh???p tu???i</p>
          <input
            type="text"
            className="userName_signUp"
            placeholder="Nh???p tu???i"
            value={userAge}
            onBlur={checkAge}
            onChange={(e) => setUserAge(e.target.value)}
          />
          <small>{errorUserAge}</small>

          <select
            value={userGender}
            onBlur={checkGender}
            onChange={(e) => handleChangeGender(e)}
          >
            <option value="">Gi???i t??nh</option>
            <option value="Nam">Nam</option>
            <option value="N???">N???</option>
          </select>
          <small>{erroUserGender}</small>

            <p>S??? ??i???n tho???i</p>
          <input
            type="number"
            className="userName_signUp"
            placeholder="Nh???p s??? ??i???n tho???i"
            value={userPhoneNumber}
            onBlur={checkPhoneNumber}
            onChange={(e) => setUserPhoneNumber(e.target.value)}
          />
          <small>{errorUserPhoneNumber}</small>

          <Link to="/SignUpEmail">
            <button onClick={deleteEmail}>Quay l???i</button>
          </Link>
          <button onClick={submit}>Ti???p t???c </button>

          <div>
            B???n ???? c?? t??i kho???n?
            <Link className="no_underline" to="/">
              <div> ????ng nh???p t???i ????y </div>
            </Link>
          </div>
        </div>
        {displayErrorInput && (
          <div className="modalSiginErrorEmail">
            <div className="modal_content">
              <h2>Vui l??ng ki???m tra l???i th??ng tin</h2>
              <button onClick={() => setdisplayErrorInput(false)}>
                ?????ng ??
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SignUpInforUser;
