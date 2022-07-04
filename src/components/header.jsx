import React from 'react';
import '../style/header.css'
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <div className='header flex'>
            <i>IconBar</i>
            <h1>Quản lý sinh viên</h1>
            <div className='account'>
                <Link className='no_underline' to='/Login'>
                    <span>Đăng Nhập</span>
                </Link>
                <Link className='no_underline' to='/SignUp'>
                    <span>Đăng Ký</span>
                </Link>
            </div>
        </div>
    );
}

export default Header;