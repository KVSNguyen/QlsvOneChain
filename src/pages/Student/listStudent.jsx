import React, { useState } from 'react';
import db from '../../firebase/firebase';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {ReloadOutlined} from '@ant-design/icons'
import {CloseOutlined} from '@ant-design/icons'

function ListStudent(props) {
    const [student, setstudent] = useState([])
    const events = db.collection('student')
    const [displayModalDelete, setDisplayModalDelete] = useState(false)
    const [displayModalUpdate, setDisplayModalUpdate] = useState(false)
    const [currentIdDelete, setCurrentIdDelete] = useState()
    const [studentIDUpdate, setstudentIDUpdate] = useState('')
    const [studentNameUpdate, setStudentNameUpdate] = useState('')
    const [studentEmailUpdate, setstudentEmailUpdate] = useState('')
    const [genderUpdate, setgenderUpdate] = useState('')
    const [studentAgeUpdate, setstudentAgeUpdate] = useState('')
    const [studentStatusUpdate, setstudentStatusUpdate] = useState('')
    const [studentMajorUpdate, setstudentMajorUpdate] = useState('')
    const [phoneNumberUpdate, setphoneNumberUpdate] = useState('')
    const [studentHomeTownUpdate, setstudentHomeTownUpdate] = useState('')
    const [errorIDUpdate, seterrorIDUpdate] = useState('')
    const [errorNameUpdate, seterrorNameUpdate] = useState('')
    const [errorStatusUpdate, seterrorStatusUpdate] = useState('')
    const [errorEmail, seterrorEmail] = useState('')
    const [errorMajorUpdate, seterrorMajorUpdate] = useState('')
    const [errorAgeUpdate, seterrorAgeUpdate] = useState('')
    const [errorGenderUpdate, seterrorGenderUpdate] = useState('')
    const [errorPhoneNumberUpdate, seterrorPhoneNumberUpdate] = useState('')
    const [errorHometownUpdate, seterrorHometownUpdate] = useState('')
    const [currentIdUpdate, setcurrentIdUpdate] = useState('')
    const [filterStatus, setfilterStatus] = useState('')
    const [fillterMajor, setfillterMajor] = useState('')
    const [searchData, setSearchData] = useState('')
    const [reload, setreload] = useState('')
    const [inforStudent, setInforStudent] = useState(false)
    const [displayTable, setDisplayTable] = useState(true)
    const [displayGrid, setDisplayGrid] = useState(false)

    const showTable =  () => {
        setDisplayTable(!displayTable)
    }

    const showModalUpdate = (element) => {
        setcurrentIdUpdate(element.id)
        setstudentIDUpdate(element.code)
        setStudentNameUpdate(element.name)
        setstudentAgeUpdate(element.age)
        setstudentStatusUpdate(element.class)
        setstudentMajorUpdate(element.major)
        setstudentEmailUpdate(element.email)
        setgenderUpdate(element.gender)
        setphoneNumberUpdate(element.phoneNumber)
        setstudentHomeTownUpdate(element.homeTown)
        setDisplayModalUpdate(!displayModalUpdate)
        setEmtyErrorValueUpdate()
        console.log(element.id);
    }

    const showModalDelete = (id) => {
        setCurrentIdDelete(id)
        setDisplayModalDelete(!displayModalDelete)
    }

    const getData = () => {
        events.get().then((querySnapshot) => {
            const tempDoc = [];
            querySnapshot.forEach((doc) => {
                tempDoc.push({ id: doc.id, ...doc.data() });
            });
                setstudent(tempDoc)
        })
    }

    useEffect(()=> {
      getData()
    },[])

    // Submit form
    const updateData = (id) => {
        const result =  student.filter(element => {
            return element.code === studentIDUpdate
        })
        if(result.length > 0) {
            alert('Sinh viên đã tồn tại')
        }
        if(result.length === 0 && errorIDUpdate === '' && errorNameUpdate === ''&& errorAgeUpdate === ''
        && errorStatusUpdate === ''&& errorMajorUpdate === ''&& errorGenderUpdate === ''&& errorPhoneNumberUpdate === '' 
        && errorHometownUpdate ==='' &&studentIDUpdate !== '' && studentNameUpdate!== ''&& genderUpdate!== ''
        && studentAgeUpdate!== ''&& studentStatusUpdate!== ''&& studentMajorUpdate!== ''&& phoneNumberUpdate!== ''&& studentHomeTownUpdate!== ''){
            alert('Sửa thành công')
                db.collection("student").doc(currentIdUpdate).update({
                age: studentAgeUpdate,
                status: studentStatusUpdate,
                code: studentIDUpdate,
                email: studentEmailUpdate,
                gender: genderUpdate,
                homeTown: studentHomeTownUpdate,
                major: studentMajorUpdate,
                name: studentNameUpdate,
                phoneNumber: phoneNumberUpdate,
            })
            getData()
            setDisplayModalUpdate(false)
        }
         if(studentIDUpdate === '' && studentNameUpdate=== ''&& genderUpdate=== ''
            && studentAgeUpdate=== ''&& studentStatusUpdate=== ''&& studentMajorUpdate=== ''&& phoneNumberUpdate=== ''&& studentHomeTownUpdate=== '') {
            alert('Vui lòng nhập đẩy đủ thông tin')
        }
    }

    const deleteStudent = async (id) => {
        await db.collection('student').doc(id).delete()
        showModalDelete()
        getData()
    }

//  Check Emty Input
    const checkID = () => {
        if(studentIDUpdate.length === 0) {
            seterrorIDUpdate('Không được để trống')
        }else {
            seterrorIDUpdate('')
        }
    }

    const checkName = () => {
        if(studentNameUpdate.length === 0) {
            seterrorNameUpdate('Không được để trống')
        }else if(studentNameUpdate.length > 40) {
            seterrorNameUpdate('Vượt quá kí tự cho phép')
        } {
            seterrorNameUpdate('')
        }
    }
    const checkClass = () => {
        if(studentStatusUpdate.length === 0) {
            seterrorStatusUpdate('Không được để trống')
        }else if(studentStatusUpdate.length > 10) {
            seterrorStatusUpdate('Không nhập quá 10 kí tự')
        }else {
            seterrorStatusUpdate('')
        }
    }
    const checkGenderUpdate = () => {
        if(genderUpdate.length === 0) {
            seterrorGenderUpdate('Không được để trống')
        }else {
            seterrorGenderUpdate('')
        }
    }
    const checkPhoneNumberUpdate = () => {
        if(phoneNumberUpdate.length === 0) {
            seterrorPhoneNumberUpdate('Không được để trống')
        }else if(phoneNumberUpdate < 10 || phoneNumberUpdate > 11) {
            seterrorPhoneNumberUpdate('Số điện thoại không hợp lệ')
        }else {
            seterrorPhoneNumberUpdate('')
        }
    }
    const checkMajor = () => {
        if(studentMajorUpdate.length === 0) {
            seterrorMajorUpdate('Không được để trống')
        }else {
            seterrorMajorUpdate('')
        }
    }

    const checkAge = () => {
        if(studentAgeUpdate.length === 0) {
            seterrorAgeUpdate('Không được để trống')
        }else {
            seterrorAgeUpdate('')
        }
    }

    const checkHometown = () => {
        if(studentHomeTownUpdate.length === 0) {
            seterrorHometownUpdate('Không được để trống')
        }else {
            seterrorHometownUpdate('')
        }
    }

    const checkEmail= () => {
        const regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(studentEmailUpdate)
        if(studentEmailUpdate === '') {
            seterrorEmail('Không được để trống')
        } else if(!regexEmail) {
            seterrorEmail('Email không hợp lệ')
        } 
        else {
            seterrorEmail('')
        }
    }

    //Change value when choose this
    const handleChangeGenderUpdate = ((e) => {
        setgenderUpdate(e.target.value)
    })

    const handleChangeMajor = ((e) => {
        setstudentMajorUpdate(e.target.value)
    })

    const handleChangeStatus = ((e) => {
        setstudentStatusUpdate(e.target.value)
    })

    const setEmtyErrorValueUpdate = () => {
        seterrorIDUpdate('')
        seterrorNameUpdate('')
        seterrorAgeUpdate('')
        seterrorStatusUpdate('')
        seterrorGenderUpdate('')
        seterrorHometownUpdate('')
        seterrorMajorUpdate('')
        seterrorPhoneNumberUpdate('')
    }

    //fillter Student
    const handleChangeStatusFilter = async (e) => { 
       const result = await fillterStudent('status', e.target.value)
       setstudent(result)
       setInforStudent(false)
    }

    const handleChangeMajorFilter = async (e) => {
        const result =  
       await fillterStudent('major', e.target.value)
       setstudent(result)
       setInforStudent(false)
    }

    // s
    const searchStudent = async () => {
        if(searchData === '') {
            getData()
            setInforStudent(false)
        }else {
            const  result = await fillterStudent('code', searchData)
            setstudent(result)
            setInforStudent(true)
        }
    }
       
    //load lại data trong database
    const reloadpage = () => {
        getData()
        setInforStudent(false)
    }

    const fillterStudent = async (key, value) => {
          const tempDoc = [];
        await db
          .collection("student")
          .where(key, "==", value)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              tempDoc.push({ id: doc.id, ...doc.data() });
            });
          })
          .catch((error) => {
            console.log("Lỗi lấy dữ liệu: ", error);
          });
          return tempDoc;
    }

    const showGridStudent = () => {
        setDisplayTable(false)
        setDisplayGrid(true)
    }

    const showTableStudent = () => {
        setDisplayGrid(false)
        setDisplayTable(true)
    }

    return (
        <div className="container flex">              
                    <div className="option">
                        <h2>Tùy chọn 
                        </h2>
                            <div className='theme'>
                                <div onClick={showGridStudent}>
                                    Student Grid
                                </div>
                                <div onClick={showTableStudent}>
                                    Student Table
                                </div>
                                </div>
                        <div >
                            <input 
                                className="searchByCode"
                                value={searchData}
                                onChange = {(e) => {setSearchData(e.target.value)}}
                             type="text" placeholder='Nhập mã sinh viên'/>
                            <button onClick={searchStudent}>Tìm kiếm</button>
                        </div>

                        <div>
                          {
                           inforStudent && student.map((element, index)=> {
                                return (         
                                    <> 
                                    <div className='studentDetail' key={index}>
                                       <h3 style={{marginTop: '10px', fontSize: '19px'}}>Thông tin sinh viên</h3>
                                        <div><strong>Mã sinh viên: </strong>  {element.code}</div>
                                        <div><strong>Họ tên: </strong>  {element.name}</div>
                                        <div><strong>Tuổi: </strong>  {element.age}</div>
                                        <div><strong>Trạng thái: </strong>{element.status}</div>
                                        <div><strong>Email:  </strong> {element.email}</div>
                                        <div><strong>Ngành học: </strong> {element.major}</div>
                                        <div><strong>Số điện thoại: </strong>  {element.phoneNumber}</div>
                                        <div><strong>Quên quán: </strong> {element.homeTown}</div>
                                    </div>
                                    
                                    </>
                                )
                            })
                        }
                        </div>
                       
                    </div>
                    <form action="">
                        <div className="title flex">
                            <h2 onClick = {reloadpage}>
                            Danh sách sinh viên 
                            <span>
                                Reload
                            </span>
                            </h2>
                            <Link to='/Add'>
                                <button className='btnAdd' type='button'>Thêm mới +</button>
                            </Link>
                        </div>
                        <div className="filterStudent ">
                            <select
                                value={filterStatus} 
                                onChange={(e) => handleChangeStatusFilter(e)}>
                                <option value="">Chọn trạng thái</option>
                                <option value="Đang học">Đang học</option>
                                <option value="Đã học xong">Đã học xong</option>
                                <option value="Đã nghỉ học">Đã nghỉ học</option>
                                <option value="Đình chỉ">Đình chỉ</option>
                                <option value="Bảo lưu">Bảo lưu</option>
                            </select>

                            <select
                                value={fillterMajor}
                                onChange={(e) => handleChangeMajorFilter(e)} name="" id="">
                                <option value="">Chọn ngành học</option>
                                <option value="CNTT">CNTT</option>
                                <option value="Dược">Dược</option>
                                <option value="Ngôn ngữ Anh">Ngôn ngữ Anh</option>
                                <option value="Du lịch">Du lịch</option>
                                <option value="Quản trị khách sạn">Quản trị khách sạn</option>
                                <option value="Công nghệ ô tô">Công nghệ ô tô</option>
                            </select>
                        </div>
                       { displayTable && 
                                    <table >
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Mã sinh viên</th>
                                                <th>Họ và tên</th>
                                                <th>Trạng thái</th>
                                                <th>Ngành học</th>
                                                <th>Email</th>
                                                <th>Tùy chọn</th>
                                            </tr>
                                        </thead>

                                        <tbody className='list_student'>
                                            { 
                                                student.map((element, index) => {
                                                    return (     
                                                        <tr key={index}>
                                                        <td>{index +1}</td>
                                                        <td>{element.code}</td>
                                                        <td>{element.name}</td>
                                                        <td>{element.status}</td>
                                                        <td>{element.major}</td>
                                                        <td>{element.email}</td>
                                                        <td>
                                                            <button onClick={() => showModalUpdate(element)} type='button' className='b_1_solid_grey'>Sửa</button>
                                                            <button onClick={() => showModalDelete(element.id)} type='button' className='b_1_solid_grey'>Xóa</button>
                                                        </td>
                                                    </tr>  
                                                    )
                                                
                                                })  
                                            }
                                            
                                        </tbody>
                                    </table>
                       } 

                        {
                            displayGrid && 
                            <div className='gridStudent flex'>
                                {
                                    student.map(element => {
                                        return (
                                            <div className='item'>
                                                <div><b>MSV: </b>{element.code}</div>
                                                <div><b>Họ và tên: </b>{element.name}</div>
                                                <div><b>Trạng thái: </b>{element.status}</div>
                                                <div><b>Ngành học: </b>{element.major}</div>
                                                <div><b>Số điện thoại: </b>{element.email}</div>
                                                <div><b>Quê quán: </b>{element.email}</div>
                                            </div>
                                           
                                        )
                                        
                                    })
                                }
                                
                            </div>
                        }
                    </form>     
                    
                    {/* Modal Delete */}
                    {
                        displayModalDelete && currentIdDelete && (
                            <div className='deleteStudent'>
                                <div className="modal_content p_20">
                                        <h2>Xóa {studentIDUpdate} khỏi danh sách?</h2>
                                        <div className="flex">
                                            <button type='button' onClick={() => {deleteStudent(currentIdDelete)}}>Có</button>
                                            <button type='button' onClick={showModalDelete}>Không</button>
                                        </div>  
                                </div>
                            </div>
                        )
                    }

                    {/* Modal Update */}
                    {
                        displayModalUpdate && currentIdUpdate &&(
                            <div className='updateStudent'>
                                <div className="modal_content">
                                    <h2>Sửa Sinh Viên </h2> 
                                    <span onClick={showModalUpdate}><CloseOutlined /></span>
                                        <div className='flex'>
                                            <div>
                                                <input 
                                                    type="text" 
                                                    className='studentIDUpdate' 
                                                    placeholder='Mã sinh viên'
                                                    value={studentIDUpdate}
                                                    onBlur={checkID}
                                                    onChange={(e) => setstudentIDUpdate(e.target.value)}
                                                    /> <small>{errorIDUpdate}</small>
                                                <input 
                                                    type="text" 
                                                    className='studentNameUpdate' 
                                                    placeholder='Tên sinh viên'
                                                    value={studentNameUpdate}
                                                    onBlur={checkName}
                                                    onChange={(e) => setStudentNameUpdate(e.target.value)}
                                                    /> <small>{errorNameUpdate}</small>
                                            <input 
                                                    type="number" 
                                                    className='studentAgeUpdate' 
                                                    placeholder='Tuổi'
                                                    value={studentAgeUpdate}
                                                    onBlur={checkAge}
                                                    onChange={(e) => setstudentAgeUpdate(e.target.value)}
                                                    /> <small>{errorAgeUpdate}</small>
                                            </div>

                                        <div>   
                                                <select value={genderUpdate} onBlur={checkGenderUpdate} onChange = {(e)=> handleChangeGenderUpdate(e)}>
                                                    <option value="">Chọn giới tính</option>
                                                    <option value="Nam">Nam</option>
                                                    <option value="Nữ">Nữ</option>
                                                </select> <small>{errorGenderUpdate}</small>
                                                
                                                <select 
                                                    className='studentStatusUpdate' 
                                                    value={studentStatusUpdate} 
                                                    onBlur={
                                                        checkClass
                                                    }
                                                    onChange = {(e)=> handleChangeStatus(e)}>
                                                        <option value="">Chọn trạng thái</option>
                                                        <option value="Đang học">Đang học</option>
                                                        <option value="Đã học xong">Đã học xong</option>
                                                        <option value="Đã nghỉ học">Đã nghỉ học</option>
                                                        <option value="Đình chỉ">Đình chỉ</option>
                                                        <option value="Bảo lưu">Bảo lưu</option>
                                                </select>
                                                <small>{errorStatusUpdate}</small>

                                                <select 
                                                    className='studentMajorUpdate' 
                                                    value={studentMajorUpdate} 
                                                    onBlur={checkMajor}
                                                    onChange = {(e)=> handleChangeMajor(e)}>
                                                    <option value="">Chọn ngành</option>
                                                    <option value="CNTT">CNTT</option>
                                                    <option value="Dược">Dược</option>
                                                    <option value="Ngôn ngữ Anh">Ngôn ngữ Anh</option>
                                                    <option value="Du lịch">Du lịch</option>
                                                    <option value="Quản trị khách sạn">Quản trị khách sạn</option>
                                                    <option value="Công nghệ ô tô">Công nghệ ô tô</option>
                                                </select>
                                                <small>{errorMajorUpdate}</small>

                                        </div>
                                        </div>  
                                            <input type="email" 
                                            placeholder = "Email"
                                            value={studentEmailUpdate}
                                            onBlur={checkEmail}
                                            onChange={(e) => setstudentEmailUpdate(e.target.value)}/>
                                            <small>{errorEmail}</small>
                                            <input 
                                                type= "number"
                                                className='phoneNumberUpdate' 
                                                placeholder='Số điện thoại'
                                                value={phoneNumberUpdate}
                                                onBlur={checkPhoneNumberUpdate}
                                                onChange={(e) => setphoneNumberUpdate(e.target.value)}/>
                                                <small>{errorPhoneNumberUpdate}</small>
                                            <input 
                                                type= "text" 
                                                className='studentHomeTownUpdate' 
                                                placeholder='Quê quán'
                                                onBlur={checkHometown}
                                                value={studentHomeTownUpdate}
                                                onChange={(e) => setstudentHomeTownUpdate(e.target.value)}/>
                                                <small>{errorHometownUpdate}</small>
                                            <button onClick={()=>{updateData()}}>Sửa</button>
                                </div>
                            </div>
                        )
                    }
            </div>
    );
}

export default ListStudent;