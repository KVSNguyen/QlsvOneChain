import React, { useState } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import '../../style/homePage.css'
import ListStudent from '../Student/listStudent';

function Home(props) {
    return (
        <div className='home_page'>
            <div className='flex'>
                <Header />
                <ListStudent />
            </div>
            <Footer />
        </div>
    );
}

export default Home;