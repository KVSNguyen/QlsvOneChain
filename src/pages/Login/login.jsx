import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import db from '../../firebase/firebase';
import '../../style/login.css';
import {UserOutlined} from "@ant-design/icons"

function Login(props) {
    const events = db.collection('user'); 
    const [userNameEmail, setuserNameEmail] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('')
    const [admin, setAdmin] = useState([])
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    useEffect(()=> {
        events.get().then((querySnapshot) => {
        const tempDoc = [];
        querySnapshot.forEach((doc) => {
          tempDoc.push({ id: doc.id, ...doc.data() 
        });
            });
            setAdmin(tempDoc)
        })
    },[])

    console.log(admin);
    const togglePassword = () => {
        if(passwordLogin === '') {
            setShowPassword(showPassword)
        }else {
            setShowPassword(!showPassword)
        }
    }

    const submit = () => {
        const result = admin.filter(element => {
            if(element.email === userNameEmail) {
                localStorage.setItem('id', element.id)
            }
            console.log(element.email, element.password);
            return element.email === userNameEmail && element.password === passwordLogin 
        })
        if(result.length > 0 ) {
            alert('Đăng nhập thành công')
            navigate('/Home')
        }
        if(result.length <= 0) {
            alert('Tài khoản hoặc mật khẩu không chính xác')
        }
    }

    return (
        <div className='login'>
            <h2> <UserOutlined /> Đăng Nhập</h2>
            <input 
                type="email" 
                className='userName_Login' 
                placeholder='Nhập tài khoản Email'
                value={userNameEmail}
                onChange={(e) => setuserNameEmail(e.target.value)}
            />
            <input 
                type= {showPassword ? "text" : "password"} 
                className='passWord_Login' 
                placeholder='Mật khẩu'
                value={passwordLogin}
                onChange={(e) => setPasswordLogin(e.target.value)}/>
            <p onClick={togglePassword}>Hiện mật khẩu</p>
            <button onClick={submit}>Đăng nhập</button>
            <span>Chưa có tài khoản? <Link className='no_underline' to = '/SignUp'> Đăng ký</Link></span>
        </div>
    );
}

export default Login;