import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/login.css'

function Login(props) {
    return (
        <div className='login'>
        <h2>Đăng Nhập</h2>
        <input type="text" className='userName_Login' placeholder='Tên đăng nhập'/>
        <input type="text" className='passWord_Login' placeholder='Mật khẩu'/>
        <button >Đăng nhập</button>
        <Link to='/'>
            <button >Thoát</button>
        </Link>
        <p>Chưa có tài khoản? <Link className='no_underline' to = '/SignUp'> Đăng ký</Link></p>
    </div>
    );
}

export default Login;