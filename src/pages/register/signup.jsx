import React, { useEffect } from 'react';
import { useState } from 'react';
import db from '../../firebase/firebase.js';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {FacebookOutlined, GoogleOutlined,GithubOutlined} from '@ant-design/icons'
import Login from '../Login/login.jsx';
import '../../style/sign-up.css'

function SignUp(props) {
    const events = db.collection('user'); 
    const [userName, setuserName] = useState("");
    const [userPassword, setuserPassword] = useState("");
    const [errorUser, SetErrorUser] = useState('')
    const [errorPassword, SetErrorPassword] = useState('')
    const [errorConfirm, SetErrorConfirm] = useState('')
    const [userSignUp, setUserSignUp] = useState([])
    const navigateLogin = useNavigate();

    useEffect(()=> {
        events.get().then((querySnapshot) => {
        const tempDoc = [];
        querySnapshot.forEach((doc) => {
          tempDoc.push({ id: doc.id, ...doc.data() });
                setUserSignUp(tempDoc)    
            });
        })
    },[])

    const submit = (e) => {  
        if(errorUser === '' && errorPassword === '' && errorConfirm ===''
        && userName != '' && userPassword){
            const result = userSignUp.filter(element => {
                return element.name === userName;
            })
            if(result.length > 0) {
                alert('Tài khoản đã tồn tại')
            } else{
                alert('Bạn đã đăng ký thành công')
                    db.collection("user").add({
                    name: userName,
                    password: userPassword,
                });   
                navigateLogin('/')
                setuserName("");
                setuserPassword("");
                document.querySelector('.confirmPassword_signUp').value = '' 
            }
        
        }
        checkUserName()
        checkPassword()
        checkConfirm()
    };
   
    const checkUserName = () => {
        if(userName.length === 0) {
            SetErrorUser('Không được để trống')
        } else if(userName.length < 4 || userName.length >20) {
            SetErrorUser('Nhập 4-20 kí tự')
        }
         else {
            SetErrorUser('')
        }
    }

    const checkPassword = () => {
        if(userPassword.length === 0) {
            SetErrorPassword('Không được để trống')
        } else if(userPassword.length < 4 || userPassword.length > 20) {
            SetErrorPassword('Nhập 4-20 kí tự')
        }
         else {
            SetErrorPassword('')
        }
    }

    const checkConfirm = () => {
        if(document.querySelector('.passWord_signUp').value === document.querySelector('.confirmPassword_signUp').value) {
            SetErrorConfirm('')
        }else {
            SetErrorConfirm('mật khẩu không trùng khớp')
        }
    }

     return (
        <div className='sign_up'>
            <h2>Đăng Ký</h2>
            <input 
                type="text" 
                className='userName_signUp' 
                placeholder='Tên đăng nhập'
                value={userName}
                onChange={(e) => setuserName(e.target.value)}/>
                <small>{errorUser}</small>

            <input 
                type="password" 
                className='passWord_signUp' 
                placeholder='Mật khẩu'
                value={userPassword}
                onChange={(e) => setuserPassword(e.target.value)}/>
                <small>{errorPassword}</small>

            <input 
                type="password" 
                className='confirmPassword_signUp' 
                placeholder='Nhập lại mật khẩu'/>
                <small>{errorConfirm}</small>

            <button onClick={submit} >Đăng ký</button>
            <Link className='no_underline' to = '/'>
            <button >Thoát</button>
             </Link>
            <div className="social_signUp">
                <div>Đăng nhập với: </div>
                <Link to='/facebook.com.vn'>
                <span style={{color: 'blue'}}><FacebookOutlined /></span>
                </Link>
                <Link to='/google.com.vn'>
                <span style={{color: 'orange'}}><GoogleOutlined /></span>
                </Link>
                <Link to='/github.com'>
                <span style={{color: 'black'}}><GithubOutlined /></span>
                </Link>
            </div>
        </div>
    );
}

export default SignUp;