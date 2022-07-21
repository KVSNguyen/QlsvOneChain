import React, { useState, useEffect } from 'react';
import '../style/header.css'
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import {HomeOutlined} from '@ant-design/icons'
import db from '../firebase/firebase';
import {LogoutOutlined} from "@ant-design/icons"
import { storage } from '../firebase/firebase';

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
    const [image, setImage] = useState(null);
    const [progress, setprogress] = useState(0);
    const [displayImage, setdisplayImage] = useState(false);
    const [displayChangeImage, setdisplayChangeImage] = useState(false);
    const [displayUpdateSuccess, setdisplayUpdateSuccess] = useState(false);
    const [displayUpdateError, setdisplayUpdateError] = useState(false);
    const [displayModalLogOut, setdisplayModalLogOut] = useState(false);
    

    useEffect(()=> {
        getData()
    },[])

    const toggleModalLogOut = () => {
        setdisplayModalLogOut(!displayModalLogOut)
    }

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

    const user = admin.filter(element => {
        return element.id === localStorage.getItem('id')
    })

    const submit = () => {
        if(errorUserName !== ''|| errorUserAge !== ''
        ||errorPhoneNumber !== '' || errorHomeTown !=='') {
            setdisplayUpdateError(true)
        }
         if( userName === '' || userAge=== ''|| phoneNumber=== ''|| userHomeTown=== '') {
            setdisplayUpdateError(true)
        } else { 
            db.collection("user").doc(user[0].id).set({
                image: user[0].image,
                name: userName,
                age: userAge,
                gender: userGender,
                email: user[0].email,
                phoneNumber: phoneNumber,
                homeTown: userHomeTown,
                password: user[0].password
            })
            getData()
            setdisplayUpdateSuccess(true)
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

    const handleChangeFile = (event => {
        if(event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    })

    const handleUpload = async() => {
        const upLoadTask = storage.ref(`images/${image.name}`).put(image);
        upLoadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setprogress(progress)
            },
            error => {
                console.log(error);
            },
            () => {
                storage
                .ref('images')
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    // seturl(url)
                    updateImage(url)
                });
            }
        )
    }

    const updateImage = async (url) => {
        await db.collection("user").doc(user[0].id).update({
            image: url
        })
        getData()
        setdisplayChangeImage(true)
        setdisplayImage(false)
    }

    const toggleModalImage = () => {
        setdisplayImage(!displayImage)
    }

 return (
    <div>
         <div className='header '>
            <div className="header_pc flex">
                <div className='account'>
                    <div className="inforAdmin">
                        <h3>Xin chào: 
                            <p 
                                style={{color: 'red'}}>
                                {user.length > 0 ? user[0].email :' ' }
                            </p>
                        </h3>
                        {
                            user.map((element,index) => {
                                return (
                                    <div key={index}className="infor">
                                        <h3 style={{marginLeft:'30px', marginBottom:'15px', fontSize: '18px'}}>Thông tin người dùng</h3 >
                                        <div className='userImage'>
                                            <img src=
                                                {element.image} 
                                            alt="" />
                                            <h3 onClick={toggleModalImage}
                                                style={{
                                                    cursor: 'pointer'
                                                }}>Thay đổi ảnh
                                            </h3>
                                            {
                                                displayImage &&
                                                    <div className='modalImage'>
                                                        <div className="modal_content" 
                                                        style={{
                                                            padding: '20px',
                                                            width: '300px'
                                                        }}> <progress value={progress} max='100'/>
                                                            <input type="file" accept="image/*" onChange={(event) => handleChangeFile(event)}/>
                                                            <button onClick={handleUpload}>Thay đổi</button>
                                                            <button onClick={toggleModalImage}>Thoát</button>
                                                        </div>
                                                    </div>
                                            }
                                            
                                        </div>
                                        <div className="name" ><b>Họ và tên: </b>{element.name}</div>
                                        <div className="age"><b>Tuổi:</b> {element.age}</div>
                                        <div className="gender"><b>Giới tính: </b>  {element.gender}</div>
                                        <div className="phoneNumber"><b>Số điện thoại:</b> {element.phoneNumber} </div>
                                        <div className="homeTown"><b> Quê quán:</b> {element.homeTown}</div>
                                            <span style = {{cursor: 'pointer'}} onClick = {()=> showProfileUser(element)}> Sửa đổi thông tin</span>
                                    </div>
                                )
                            })
                        }
                        
                    </div>
                    { displayProfile &&
                        <>
                        <div className='updateUser'>
                            <div className="modal_content">
                                <div className="p_20">
                                    <div className='userImage'>
                                        <img src= {user[0].image} alt="" />
                                    </div>
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
                {
                    displayModalLogOut && <div className='modal_logOut'>
                        <div className="modal_content">
                            <h2>Bạn có chắc muốn đăng xuất?</h2>
                            <Link to='/'>   
                                <button>Có</button>
                            </Link>
                            <button onClick={toggleModalLogOut}>Không</button>
                        </div>
                    </div>
                }
                <h1>Quản lý sinh viên
                </h1>
                <p onClick={toggleModalLogOut}> Đăng xuất<LogoutOutlined /></p>
            </div>             

            <div className='header_mobile flex'>
                <h1><HomeOutlined style={{
                    backgroundColor: 'transparent',
                    color: 'orange',
                    border: 'none',
                    fontSize: '30px',
                    margin: '0',
                    padding: '0'
                }}/><p>Trang chủ</p></h1>
                <div className='account'>
                    <div className="inforAdmin">
                        <h3>Xin chào: 
                            <p 
                                style={{color: 'red'}}>
                                {user.length > 0 ? user[0].email :' ' }
                            </p>
                        </h3>
                        {
                            user.map((element,index) => {
                                return (
                                    <div  key={index}className="infor">
                                        <h3 style={{marginLeft:'30px', marginBottom:'15px', fontSize: '18px'}}>Thông tin người dùng</h3 >
                                        <div className='userImage'>
                                            <img src=
                                                {element.image} 
                                            alt="" />
                                            <h3 onClick={toggleModalImage}
                                                style={{
                                                    cursor: 'pointer'
                                                }}>Thay đổi ảnh
                                            </h3>
                                            {
                                                displayImage &&
                                                    <div className='modalImage'>
                                                        <div className="modal_content" 
                                                        style={{
                                                            padding: '20px',
                                                            width: '300px'
                                                        }}> <progress value={progress} max='100'/>
                                                            <input type="file" accept="image/*" onChange={(event) => handleChangeFile(event)}/>
                                                            <button onClick={handleUpload}>Thay đổi</button>
                                                            <button onClick={toggleModalImage}>Thoát</button>
                                                        </div>
                                                    </div>
                                            }
                                            
                                        </div>
                                        <div className="name" ><b>Họ và tên: </b>{element.name}</div>
                                        <div className="age"><b>Tuổi:</b> {element.age}</div>
                                        <div className="gender"><b>Giới tính: </b>  {element.gender}</div>
                                        <div className="phoneNumber"><b>Số điện thoại:</b> {element.phoneNumber} </div>
                                        <div className="homeTown"><b> Quê quán:</b> {element.homeTown}</div>
                                            <span style = {{cursor: 'pointer'}} onClick = {()=> showProfileUser(element)}> Sửa đổi thông tin</span>
                                            <p onClick={toggleModalLogOut}> Đăng xuất<LogoutOutlined /></p>
                                    </div>
                                )
                            })
                        }
                        
                    </div>
                    { displayProfile &&
                        <>
                        <div className='updateUser'>
                            <div className="modal_content">
                                <div className="p_20">
                                    <div className='userImage'>
                                        <img src= {user[0].image} alt="" />
                                    </div>
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
                {
                    displayModalLogOut && <div className='modal_logOut'>
                        <div className="modal_content">
                            <h2>Bạn có chắc muốn đăng xuất?</h2>
                            <Link to='/'>   
                                <button>Có</button>
                            </Link>
                            <button onClick={toggleModalLogOut}>Không</button>
                        </div>
                    </div>
                }        
                {
                     displayUpdateSuccess && 
                     <div className='modalUpdateSuccess'>
                         <div className='modal_content'>
                             <h2>Sửa thành công</h2>
                             <button onClick={() => setdisplayUpdateSuccess(false)}>Đồng ý</button>
                         </div>
                     </div>
                } 
                  {
                        displayUpdateError && 
                        <div className='modalUpdateSuccess'>
                            <div className='modal_content'>
                                <h2>Vui lòng kiểm tra lại thông tin</h2>
                                <button onClick={() => setdisplayUpdateError(false)}>Đồng ý</button>
                            </div>
                        </div>
                    }
                    {
                        displayChangeImage && 
                        <div className='modalUpdateSuccess'>
                            <div className='modal_content'>
                                <h2>Thay đổi ảnh thành công</h2>
                                <button onClick={() => setdisplayChangeImage(false)}>Đồng ý</button>
                            </div>
                        </div>
                    }
            </div>
        </div>
    </div>
       
    );
   
  
}

export default Header;