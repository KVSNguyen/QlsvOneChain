import React, { useEffect } from 'react';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import db from '../../firebase/firebase.js';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {FacebookOutlined, GoogleOutlined,GithubOutlined} from '@ant-design/icons'
import '../../style/sign-up.css'
import Password from 'antd/lib/input/Password.js';

function SignUpPassword(props) {
    const events = db.collection('user'); 
    const [userPassword, setuserPassword] = useState("");
    const [errorPassword, SetErrorPassword] = useState('')
    const [errorConfirm, SetErrorConFirm] = useState('')
    const [userSignUp, setUserSignUp] = useState([])
    const [cookie, setCookie, removeCookie] = useCookies( ['user'])
    const [showPassword, setShowPassword] = useState(false)
    const navigateLogin = useNavigate();
    const [displaySiginSuccess, setDisplaySiginSuccess] = useState(false)

    useEffect(()=> {
        events.get().then((querySnapshot) => {
        const tempDoc = [];
        querySnapshot.forEach((doc) => {
          tempDoc.push({ id: doc.id, ...doc.data() });
                setUserSignUp(tempDoc)    
            });
        })
    },[])

    const userAccount = userSignUp.filter(element => {
        return element.id === cookie.id
    })

    const submit = async () => {  
        if( errorPassword === '' && errorConfirm ==='' && userPassword !== ''){
           await db.collection("user").doc(userAccount[0].id).set({
                image: null,
                email: userAccount[0].email,
                password: userPassword,
                name: 'chưa có',
                gender: 'chưa có',
                age: 'chưa có',
                phoneNumber: 'chưa có',
                homeTown: 'chưa có'
            });   
            setDisplaySiginSuccess(true)
            setuserPassword("");
            document.querySelector('.confirmPassword_signUp').value = '' 
        };
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
        if(document.querySelector('.confirmPassword_signUp').value === '') {
            SetErrorConFirm('Không được để trống')
        }
        if(document.querySelector('.passWord_signUp').value === document.querySelector('.confirmPassword_signUp').value) {
            SetErrorConFirm('')
        }else {
            SetErrorConFirm('mật khẩu không trùng khớp')
        }
    }

    const togglePassword = () => {
        if(Password === '') {
            setShowPassword(showPassword)
        }else {
            setShowPassword(!showPassword)
        }
    }

     return (
        <div className='sign_up'>
            <h2>Đăng Ký</h2>
            <input 
                type= {showPassword ? "text" : "password"}  
                className='passWord_signUp' 
                placeholder='Mật khẩu'
                value={userPassword}
                onBlur={checkPassword}
                onChange={(e) => setuserPassword(e.target.value)}/>
                <small>{errorPassword}</small>

            <input 
                type= {showPassword ? "text" : "password"} 
                onBlur={checkConfirm}
                className='confirmPassword_signUp' 
                placeholder='Nhập lại mật khẩu'/>
                <small>{errorConfirm}</small>
                <p style={{textAlign:'right', cursor:'pointer', marginBottom: '0'}} onClick={togglePassword}>Hiện mật khẩu</p>

            <Link className='no_underline' to = '/SignUp'>
            <button >Trở lại</button>
             </Link>
            <button onClick={submit} >Tiếp tục </button>

            {
                displaySiginSuccess && 
                <div className='modalSiginErrorEmail'>
                    <div className='modal_content'>
                        <h2>Bạn đã đăng ký thành công</h2>
                        <Link to ='/'>
                            <button>Đi tới đăng nhập</button>  
                        </Link>
                    </div>
                </div>
            }
        </div>
    );
}

export default SignUpPassword;