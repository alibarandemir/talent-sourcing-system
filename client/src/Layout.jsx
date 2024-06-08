import React from 'react';
import RedirectHome from './components/RedirectHome';
import { useLocation } from 'react-router-dom';
import Footer from './components/Footer';


function Layout({ children }) {
  const location = useLocation();

  return (
    <div className='w-screen h-screen relative'>
      {location.pathname !== '/home' && (
        
          <RedirectHome />
        
      )}
      {children}
      <Footer/>
    </div>
  );
}

export default Layout;