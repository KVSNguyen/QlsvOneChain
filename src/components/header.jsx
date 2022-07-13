import React, { useState, useEffect } from 'react';
import '../style/header.css'
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import {PlusCircleOutlined} from '@ant-design/icons'
import db from '../firebase/firebase';
import {LogoutOutlined} from "@ant-design/icons"

function Header(props) {
    const events = db.collection('user')
    const [admin, setAdmin] = useState([])
    const [displayProfile, setDisplayProfile] = useState(false)
    const [userName, setuserName] = useState('')
    const [userAge, setuserAge] = useState('')
    const [userGender, setuserGender] = useState('')
    const [userHomeTown, setuserHomeTown]= useState('')
    const [phoneNumber, setphoneNumber] = useState('')
    const [errorUserAge, seterrorUserAge] = useState('')
    const [errorUserName, seterrorUserName] = useState('')
    const [errorGender, seterrorGender] = useState('')
    const [errorHomeTown, seterrorHomeTown] = useState('')
    const [errorPhoneNumber, seterrorPhoneNumber] = useState('')
    const [cookie, setCookie, removeCookie] = useCookies( ['user'])

    useEffect(()=> {
        getData()
    },[])

    const getData = () => {
        events.get().then((querySnapshot) => {
            const tempDoc = [];
            querySnapshot.forEach((doc) => {
                tempDoc.push({ id: doc.id, ...doc.data() });
            });
                setAdmin(tempDoc)
        })
    }

    const showProfileUser = (element) => {
        setDisplayProfile(!displayProfile)
        setuserName(element.name)
        setuserAge(element.age)
        setuserGender(element.gender)
        setphoneNumber(element.phoneNumber)
        setuserHomeTown(element.homeTown)
        setEmtyValue()
    }

    console.log(admin);
    const user = admin.filter(element => {
        return element.id === localStorage.getItem('id')
    })
    console.log(user);

    const submit = () => {
        if(errorUserName !== ''|| errorUserAge !== ''
        ||errorPhoneNumber !== '' || errorHomeTown !=='') {
            alert('vui lòng kiểm tra lại thông tin')
        }
         if( userName === '' || userAge=== ''|| phoneNumber=== ''|| userHomeTown=== '') {
            alert('Vui lòng nhập đẩy đủ thông tin')
        } else {
            db.collection("user").doc(user[0].id).set({
            name: userName,
            age: userAge,
            gender: userGender,
            email: user[0].email,
            phoneNumber: phoneNumber,
            homeTown: userHomeTown,
            password: user[0].password
            })
            alert('Cập nhật thông tin người dùng thành công');
            getData()
            showProfileUser()
            setEmtyValue()
        }      
    }

    const setEmtyValue = () => {
        seterrorGender('')
        seterrorHomeTown('')
        seterrorUserAge('')
        seterrorUserName('')
        seterrorPhoneNumber('')
        showProfileUser()
    }
    const checkUserName = () => {
        if(userName === '') {
            seterrorUserName('Không được để trống')
        } else {
            seterrorUserName('')
        }
    }

    const checkUserAge = () => {
        if(userAge === '') {
            seterrorUserAge('Không được để trống')
        }else if(userAge.length > 3 || userAge > 200) {
            seterrorUserAge('Tuổi không hợp lệ')
        } else {
            seterrorUserAge('')
        }
    }

    const checkUserGender = () => {
        if(userGender === '') {
            seterrorUserName('Không được để trống')
        } else {
            seterrorUserName('')
        }
    }

    const checkPhoneNumber = () => {
        if(phoneNumber === '') {
            seterrorPhoneNumber('Không được để trống')
        } else if(phoneNumber.length <10 || phoneNumber.length > 11) {
            seterrorPhoneNumber('Số điện thoại không hợp lệ')
        } else {
            seterrorPhoneNumber('')
        }
    }

    const checkHomeTown = () => {
        if(userHomeTown === '') {
            seterrorHomeTown('Không được để trống')
        } else {
            seterrorHomeTown('')
        }
    }
      
    const handleChangeGender = (e) => {
        setuserGender(e.target.value)
    }

 return (
        <div className='header flex'>
            <div className='account'>
                <div className="inforAdmin">
                    <h3>Người dùng: 
                        <p 
                            style={{color: 'red'}}>
                            {user.length > 0 ? user[0].email :' ' }
                        </p>
                    </h3>
                    {
                        user.map(element => {
                            return (
                                 <div className="infor">
                                    <h3 style={{marginLeft:'30px', marginBottom:'15px', fontSize: '18px'}}>Thông tin người dùng</h3 >
                                    <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" /> 
                                    <div style={{color: 'red', marginLeft: '30px', marginBottom: '15px'}}></div>
                                    <div className="name"><b>Họ và tên: </b>{element.name}</div>
                                    <div className="age"><b>Tuổi:</b> {element.age}</div>
                                    <div className="gender"><b>Giới tính: </b>  {element.gender}</div>
                                    <div className="phoneNumber"><b>Số điện thoại:</b> {element.phoneNumber} </div>
                                    <div className="homeTown"><b> Quê quán:</b> {element.homeTown}</div>
                                        <span style = {{marginLeft: '30px', cursor: 'pointer'}} onClick = {()=> showProfileUser(element)}> Sửa đổi thông tin</span>
                                </div>
                            )
                        })
                    }
                    
                </div>
                { displayProfile &&
                    <>
                    <div className='updateUser'>
                        <div className="modal_content">
                            <h2 className='p_20'>Sửa thông tin người dùng</h2>
                            <div className="p_20">
                                <div className='flex'>
                                    <div>
                                        <input 
                                            type="text" 
                                            className='userName' 
                                            placeholder='Tên người dùng'
                                            value={userName}
                                            onBlur = {checkUserName}
                                            onChange={(e) => setuserName(e.target.value)}
                                            /> <small>{errorUserName}</small>
                                            
                                        <input 
                                            type="text" 
                                            className='userAge' 
                                            placeholder='Tuổi'
                                            value={userAge}
                                            onBlur = {checkUserAge}
                                            onChange={(e) => setuserAge(e.target.value)}
                                            /> <small>{errorUserAge}</small>
                                    </div>
                                
                                <div>   
                                        <select value={userGender} onBlur = {checkUserGender} onChange = {(e)=> handleChangeGender(e)}>
                                            <option value="">Chọn giới tính</option>
                                            <option value="Nam">Nam</option>
                                            <option value="Nữ">Nữ</option>
                                        </select> <small>{errorGender}</small>
                                </div>
                                </div>  
                                    <input 
                                        type= "text"
                                        className='phoneNumber' 
                                        onBlur = {checkPhoneNumber}
                                        placeholder='Số điện thoại'
                                        value={phoneNumber}
                                        onChange={(e) => setphoneNumber(e.target.value)}/>
                                        <small>{errorPhoneNumber}</small>
                                    <input 
                                        type=  "text" 
                                        className='studentHomeTown' 
                                        placeholder='Quê quán'
                                        onBlur = {checkHomeTown}
                                        value={userHomeTown}
                                        onChange={(e) => setuserHomeTown(e.target.value)}/>
                                        <small>{errorHomeTown}</small>
                                    
                                    <button onClick={submit}>Cập nhật</button>
                                    <button onClick={showProfileUser} >Thoát</button>
                            </div>
                        </div>
                   
                    </div>
                    </>
                }
            </div>
            <h1>Quản lý sinh viên</h1>
            <Link to='/'>
            <p> Đăng xuất<LogoutOutlined /></p>
            </Link>
        </div> 
    );
   
  
}

export default Header;