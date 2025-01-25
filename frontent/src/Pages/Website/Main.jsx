import React from 'react';
import Header from '../../Components/Website/Header';
import Footer from '../../Components/Website/Footer';
import { Outlet } from 'react-router-dom';



const Main = () => {
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    );
}

export default Main;
