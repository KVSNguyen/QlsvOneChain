import React, { useState } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import '../../style/homePage.css'
import ListStudent from '../Student/listStudent';

function Home(props) {
    const [displayModalWelcome, setDisplayModalWelcome] = useState(false)
    return (
        <div className='home_page'>
            <Header />
                <ListStudent />
            <Footer />
        </div>
    );
}

export default Home;