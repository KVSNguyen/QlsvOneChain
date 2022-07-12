import React, { useState, useEffect } from 'react';
import '../style/header.css'
import { Link } from 'react-router-dom';
import {PlusCircleOutlined} from '@ant-design/icons'
import db from '../firebase/firebase';
import {LogoutOutlined} from "@ant-design/icons"

function Header(props) {
    const events = db.collection('user')
    const [admin, setAdmin] = useState([])

    useEffect(()=> {
        events.get().then((querySnapshot) => {
            const tempDoc = [];
            querySnapshot.forEach((doc) => {
                tempDoc.push({ id: doc.id, ...doc.data() });
            });
                setAdmin(tempDoc)
        })
    },[])

        const user = admin.filter(element => {
            return element.id === localStorage.getItem('id')
        })

 return (
        <div className='header flex'>
            <div className='account'>
                <img src="" alt="" />
                <div className="inforAdmin">
                    <h3>Người dùng: 
                        <p 
                            style={{color: 'red'}}>
                            {user.length !== 0 ? user[0].name :' ' }
                        </p>
                    </h3>
                    <div className="infor">
                        <span> Cập nhật trang cá nhân</span><PlusCircleOutlined />
                    </div>
                </div>
            </div>
            <h1>Quản lý sinh viên</h1>
            <Link to='/'>
            
            <p> Đăng xuất<LogoutOutlined /></p>
            </Link>
        </div> 
    );
   
  
}

export default Header;