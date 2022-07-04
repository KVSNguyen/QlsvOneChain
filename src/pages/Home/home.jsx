import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import '../../style/homePage.css'
import { Link } from 'react-router-dom';
import Login from '../Login/login';
import SignUp from '../register/signup';

function Home(props) {
    return (
        <div className='home_page'>
            <Header />
                <div className="container flex">
                    <div className="option">
                        <h2>Tùy chọn</h2>
                        <div className="searchById">
                            <input type="text" />
                            <button>Tìm kiếm</button>
                        </div>

                    <div className="filterByMajor">
                        <select name="" id="">
                            <option value="">Chọn Khóa</option>
                            <option value="">CNTT</option>
                            <option value="">Du lịch ngoại ngữ</option>
                            <option value="">Dược</option>
                            <option value="">Ngôn ngữ Anh</option>
                        </select>
                    </div>
                    </div>

                    <form action="">
                        <div className="title">
                            <h2>
                            Danh sách sinh viên
                            </h2>
                        </div>
                        <table >
                            <thead>
                                <tr>
                                    <th>Số thứ tự</th>
                                    <th>Mã sinh viên</th>
                                    <th>Họ và tên</th>
                                    <th>Ngành học</th>
                                    <th>Số điện thoại</th>
                                    <th>Tùy chọn</th>
                                </tr>
                            </thead>

                            <tbody className='list_student'>
                                <tr>
                                        <td>1</td>
                                        <td>1900142</td>
                                        <td>Nguyễn Đình Sơn</td>
                                        <td>CNTT</td>
                                        <td>0382226541</td>
                                        <td>
                                            <button type='button' className='b_1_solid_grey'>Sửa</button>
                                            <button type='button' className='b_1_solid_grey'>Xóa</button>
                                        </td>
                                    </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            <Footer />
        </div>
    );
}

export default Home;