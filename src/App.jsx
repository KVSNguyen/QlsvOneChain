import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Index";
import SignUp from "./pages/Register/SignUpEmail";
import Login from "./pages/Login/Login";
import SignUpPassword from "./pages/Register/SignUpPassword";
import SignUpInforUser from "./pages/Register/SignUpInforUser";

function App() {
  return (
    <div className="App">
      {
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/SignUpEmail" element={<SignUp />}></Route>
          <Route path="/Home" element={<Home />}></Route>
          <Route path="/SignUpPassword" element={<SignUpPassword />}></Route>
          <Route path="/SignUpInforUser" element={<SignUpInforUser />}></Route>
        </Routes>
      }
    </div>
  );
}

export default App;
