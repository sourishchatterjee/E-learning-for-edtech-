import React from 'react';
import Footer from '../components/Footer'
import Header from '../components/Header';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';



const Layout = ({ children }) => {
    return (
        <>
            <ScrollToTop />
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}


export default Layout
