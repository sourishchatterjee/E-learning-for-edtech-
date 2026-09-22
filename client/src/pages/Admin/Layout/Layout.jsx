import React from 'react';
import Footer from '../components/Footer'
import Header from '../components/Header';
import ScrollToTop from '../components/AdminScrolltop/ScrollToTop';
import AdminDashboard from '../pages/AdminDashbordPage/AdminDashbord';


const Layout = ({ children }) => {
    return (
        <>
            <ScrollToTop />
             <Header />
            <div className="layout-wrapper">
            
            <div className="layout-main-content">
            <main>
                {children}
            </main>
            <Footer />
          </div>
          </div>
        </>
    )
}


export default Layout








