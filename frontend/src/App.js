import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header';
import Home from './screens/Home';
import ContactUs from './screens/ContactUs';
import AboutUs from './screens/AboutUs';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import PageNotFound from './components/PageNotFound';
// import Footer from './components/Footer';

function App() {
  return (
    <>
      <Router>
        <Header />

        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/contact-us' element={ <ContactUs /> } />
          <Route path='/about-us' element={ <AboutUs /> } />
          <Route path='/signin' element={ <SignIn /> } />
          <Route path='/signup' element={ <SignUp /> } />
          <Route path='*' element={ <PageNotFound /> } />
        </Routes>

        {/* <Footer /> */}
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;
