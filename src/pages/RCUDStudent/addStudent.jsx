import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../style/addStudent.css'
import db from '../../firebase/firebase';

function AddStudent(props) {
    const [studentID, setstudentID] = useState('')
    const [studentName, setStudentName] = useState('')
    const [gender, setgender] = useState('')
    const [studentEmail, setstudentEmail]= useState('')
    const [studentAge, setstudentAge] = useState('')
    const [studentClass, setstudentClass] = useState('')
    const [studentMajor, setstudentMajor] = useState('')
    const [phoneNumber, setphoneNumber] = useState('')
    const [studentHomeTown, setstudentHomeTown] = useState('')
    const [errorID, seterrorID] = useState('')
    const [errorName, seterrorName] = useState('')
    const [errorClass, seterrorClass] = useState('')
    const [errorMajor, seterrorMajor] = useState('')
    const [errorGender, seterrorGender] = useState('')
    const [errorAge, seterrorAge] = useState('')
    const [errorHomeTown, seterrorHomeTown] = useState('')
    const [errorPhoneNumber, seterrorPhoneNumber] = useState('')
    const [students, setStudent] =useState([])
    const [errorEmail, seterrorEmail] = useState('')
    const events = db.collection('student')

    useEffect(()=> {
        getData()
    },[])

    const getData = () => {
        events.get().then((querySnapshot) => {
            const tempDoc = [];
            querySnapshot.forEach((doc) => {
              tempDoc.push({ id: doc.id, ...doc.data() 
            });
                });
                setStudent(tempDoc)
            })
    }
 
    const submit = () => {
        const result =  students.filter(student => {
            return student.code === studentID
        })
        if(result.length > 0) {
            alert('Sinh viên đã tồn tại')
        }
        if(result.length === 0 && errorID === '' && errorName === ''&& errorAge === ''
        && errorClass === ''&& errorMajor === ''&& errorGender === ''&& errorPhoneNumber === '' 
        && errorHomeTown ==='' &&studentID !== '' && studentName!== ''&& gender!== ''
        && studentAge!== ''&& studentClass!== ''&& studentMajor!== ''&& phoneNumber!== ''&& studentHomeTown!== ''){
            alert('Thêm sinh viên thành công')
            db.collection("student").add({
            code: studentID,
            name: studentName,
            gender: gender,
            email: studentEmail,
            age: studentAge,
            class: studentClass,
            major: studentMajor,
            phoneNumber: phoneNumber,
            homeTown: studentHomeTown
            })
        }
         if(studentID === '' || studentName=== ''|| gender=== ''
            || studentAge=== ''|| studentClass=== ''|| studentMajor=== ''|| phoneNumber=== ''|| studentHomeTown=== '') {
            alert('Vui lòng nhập đẩy đủ thông tin')
        }
    }

    const checkID = () => {
        if(studentID === '') {
            seterrorID('Không được để trống')
        } else if(studentID.length > 10) {
            seterrorID('Không nhập quá 10 kí tự')
        } 
        else {
            seterrorID('')
        }
    }

    const checkEmail= () => {
//         const re =
//             /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
//   console.log(re);
//         if(studentEmail === '') {
//             seterrorEmail('Không được để trống')
//         } else if(!re) {
//             seterrorEmail('Email không hợp lệ')
//         } 
//         else {
//             seterrorEmail('')
//         }
    }
    const checkName = () => {
        let result = /^[a-zA-Z ]+$/.test(studentName);
        if(studentName === '') {
            seterrorName('Không được để trống')
        } else if (!result) {
            seterrorName('Tên người dùng không hợp lệ')
        }
        else {
            seterrorName('')
        }
    }

    const checkAge = () => {
        if(studentAge === '') {
            seterrorAge('Không được để trống')
        }else if(studentAge.length > 3 || studentAge > 200) {
            seterrorAge('Tuổi không hợp lệ')
        } else {
            seterrorAge('')
        }
    }
    const checkClass = () => {
        if(studentClass === '') {
            seterrorClass('Không được để trống')
        } else {
            seterrorClass('')
        }
    }

    const checkGender = () => {
        if(gender === '') {
            seterrorGender('Không được để trống')
        } else {
            seterrorGender('')
        }
    }
    const checkMajor = () => {
        if(studentMajor === '') {
            seterrorMajor('Không được để trống')
        } else {
            seterrorMajor('')
        }
    }
    const checkPhoneNumber = () => {
        if(phoneNumber === '') {
            seterrorPhoneNumber('Không được để trống')
        } else {
            seterrorPhoneNumber('')
        }
    }
    const checkHomeTown = () => {
        if(studentHomeTown === '') {
            seterrorHomeTown('Không được để trống')
        } else {
            seterrorHomeTown('')
        }
    }

    const handleChangeGender = ((e) => {
        setgender(e.target.value)
    })

    const handleChangeMajor = ((e) => {
        setstudentMajor(e.target.value)
    })

    const handleChangeClass = ((e) => {
        setstudentClass(e.target.value)
    })
    return (
        <div className='addStudent'>
            <h2 className='p_20'>Thêm Sinh Viên</h2>
            <div className="p_20">
                <div className='flex'>
                    <div>
                         <input 
                            type="text" 
                            className='studentID' 
                            placeholder='Mã sinh viên'
                            value={studentID}
                            onBlur = {checkID}
                            onChange={(e) => setstudentID(e.target.value)}
                            /> <small>{errorID}</small>
                        <input 
                            type="text" 
                            className='studentName' 
                            placeholder='Tên sinh viên'
                            value={studentName}
                            onBlur = {checkName}
                            pattern ="[a-z]"
                            title='Tên người dùng không được để kiểu số'
                            onChange={(e) => setStudentName(e.target.value)}
                            /> <small>{errorName}</small>
                     <input 
                            type="text" 
                            className='studentAge' 
                            placeholder='Tuổi'
                            onBlur = {checkAge}
                            value={studentAge}
                            onChange={(e) => setstudentAge(e.target.value)}
                            /> <small>{errorAge}</small>
                    </div>

                    
                   <div>   
                        <select value={gender} onBlur = {checkGender} onChange = {(e)=> handleChangeGender(e)}>
                            <option value="">Chọn giới tính</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                        </select> <small>{errorGender}</small>
                        

                        <select 
                            className='studentClass' 
                            value={studentClass} 
                            onBlur = {checkClass}
                            onChange = {(e)=> handleChangeClass(e)}>
                            <option value="">Chọn lớp</option>
                            <option value="D101">D101</option>
                            <option value="D102">D102</option>
                            <option value="D103">D103</option>
                            <option value="D104">D104</option>
                            <option value="D105">D105</option>
                            <option value="D106">D106</option>
                        </select>
                        <small>{errorClass}</small>

                        <select 
                            className='studentMajor' 
                            value={studentMajor} 
                            onBlur = {checkMajor}
                            onChange = {(e)=> handleChangeMajor(e)}>
                            <option value="">Chọn ngành</option>
                            <option value="CNTT">CNTT</option>
                            <option value="Dược">Dược</option>
                            <option value="Ngôn ngữ Anh">Ngôn ngữ Anh</option>
                            <option value="Du lịch">Du lịch</option>
                            <option value="Quản trị khách sạn">Quản trị khách sạn</option>
                            <option value="Công nghệ ô tô">Công nghệ ô tô</option>
                        </select>
                        <small>{errorMajor}</small>

                      
                   </div>
                </div>   
                    <input 
                        type="email" 
                        className='studentEmail' 
                        placeholder='Email'
                        onBlur = {checkEmail}
                        value={studentEmail}
                        onChange={(e) => setstudentEmail(e.target.value)} required
                        /> <small>{errorEmail}</small>
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
                        value={studentHomeTown}
                        onChange={(e) => setstudentHomeTown(e.target.value)}/>
                        <small>{errorHomeTown}</small>

                    <button onClick={submit}>Thêm</button>
                <Link to='/Home'>
                    <button >Thoát</button>
                </Link>
                </div>
        </div>
    );
}

export default AddStudent;