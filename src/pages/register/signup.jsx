import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/sign-up.css';

function SignUp(props) {
    return (
        <div className='sign_up'>
            <h2>Đăng Ký</h2>
            <input type="text" className='userName_signUp' placeholder='Tên đăng nhập'/>
            <input type="text" className='passWord_signUp' placeholder='Mật khẩu'/>
            <input type="text" className='confirmPassword_signUp' placeholder='Nhập lại mật khẩu'/>
            <button >Đăng ký</button>
            <Link className='no_underline' to = '/'>
            <button >Thoát</button>
             </Link>
            <div className="social_signUp">
                <div>Đăng nhập với: </div>
                <span>Facebook</span>
                <span>Google</span>
                <span>Github</span>
            </div>
        </div>
    );
}

export default SignUp;