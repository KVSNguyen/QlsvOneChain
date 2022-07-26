import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import db from "../../firebase/firebase";
import "../../style/login.css";
import { UserOutlined } from "@ant-design/icons";

function Login(props) {
  const events = db.collection("user");
  const [userNameEmail, setuserNameEmail] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [admin, setAdmin] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [displayLoginSuccess, setDisplayLoginSuccess] = useState(false);
  const [displayLoginError, setDisplayLoginError] = useState(false);

  useEffect(() => {
    events.get().then((querySnapshot) => {
      const tempDoc = [];
      querySnapshot.forEach((doc) => {
        tempDoc.push({ id: doc.id, ...doc.data() });
      });
      setAdmin(tempDoc);
    });
  }, []);

  const togglePassword = () => {
    if (passwordLogin === "") {
      setShowPassword(showPassword);
    } else {
      setShowPassword(!showPassword);
    }
  };

  const submit = () => {
    const result = admin.filter((element) => {
      if (element.email === userNameEmail) {
        localStorage.setItem("id", element.id);
      }
      return (
        element.email === userNameEmail && element.password === passwordLogin
      );
    });
    if (result.length > 0) {
      setDisplayLoginSuccess(true);
    }
    if (result.length <= 0) {
      setDisplayLoginError(true);
    }
  };

  return (
    <div className="login flex">
      <div className="imageLogin">
        <img
          src="data:image/jpeg;base64,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"
          alt=""
        />
      </div>

      <div>
        <h2>
          {" "}
          <UserOutlined /> Đăng Nhập
        </h2>
        <input
          role={alert}
          type="email"
          className="userName_Login"
          placeholder="Nhập tài khoản Email"
          value={userNameEmail}
          onChange={(e) => setuserNameEmail(e.target.value)}
        />
        <input
          type={showPassword ? "text" : "password"}
          className="passWord_Login"
          placeholder="Mật khẩu"
          value={passwordLogin}
          onChange={(e) => setPasswordLogin(e.target.value)}
        />
        <p onClick={togglePassword}>Hiện mật khẩu</p>
        <button onClick={submit}>Đăng nhập</button>
        <span>
          Chưa có tài khoản?{" "}
          <Link className="no_underline" to="/SignUpEmail">
            {" "}
            Đăng ký
          </Link>
        </span>
        {displayLoginSuccess && (
          <div className="modalLoginSuccess">
            <div className="modal_content">
              <h2>Bạn đã đăng nhập thành công</h2>
              <Link to="/Home">
                <button onClick={() => setDisplayLoginSuccess(false)}>
                  Vào trang chủ
                </button>
              </Link>
            </div>
          </div>
        )}

        {displayLoginError && (
          <div className="modalLoginError">
            <div className="modal_content">
              <h2>Vui lòng kiểm tra lại tài khoản</h2>
              <button onClick={() => setDisplayLoginError(false)}>
                Đồng ý
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
