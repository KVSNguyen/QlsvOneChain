import React, { useEffect } from 'react';
import { useState } from 'react';
import db from '../../firebase/firebase.js';
import { useCookies } from 'react-cookie';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {FacebookOutlined, GoogleOutlined,GithubOutlined} from '@ant-design/icons'
import Login from '../Login/login.jsx';
import '../../style/sign-up.css'

function SignUp(props) {
    const events = db.collection('user'); 
    const [userEmail, setuserEmail] = useState("");
    const [errorUser, SetErrorUser] = useState('')
    const [cookie, setCookie] = useCookies(['user'])
    const [user, setuser] = useState([])
    const navigate = useNavigate();

    useEffect(()=> {
        getData()
    },[])

    const getData = () => {
        events.get().then((querySnapshot) => {
            const tempDoc = [];
            querySnapshot.forEach((doc) => {
                tempDoc.push({ id: doc.id, ...doc.data() });
                    setuser(tempDoc)    
            });
        })
    }

   //Check email invailid in database
    const submit = async (e) => { 
        if(userEmail !=='' && errorUser === '') {
            const result = user.filter(element => {
                return element.email === userEmail
            }) 
            if(result.length > 0) {
                alert('Email đã tồn tại')
            }else {
               await db.collection('user').add({
                    email: userEmail
                });
                setuserEmail('')
                navigate('/SignUpPassword')
            }
        }
        checkuserEmail()
    }

    getData()
    user.map(element => {
        if(element.email === userEmail) {
            setCookies('id', element.id, 3)
            console.log(cookie);
        }
    })

    function setCookies(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    const checkuserEmail = () => {
        const regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(userEmail)
        if(userEmail.length === 0) {
            SetErrorUser('Không được để trống')
        } else if(!regexEmail) {
            SetErrorUser('Email không hợp lệ')
        }
         else {
            SetErrorUser('')
        }
    }

     return (
        <div className='sign_up'>
            <h2>Đăng Ký</h2>
            <input 
                type="text" 
                className='userName_signUp' 
                placeholder='Nhập email của bạn'
                value={userEmail}
                onChange={(e) => setuserEmail(e.target.value)}/>
                <small>{errorUser}</small>


            <Link className='no_underline' to = '/'>
            <button >Trở lại đăng nhập</button>
             </Link>
            <button onClick={submit} >Tiếp tục </button>
        </div>
    );
}

export default SignUp;