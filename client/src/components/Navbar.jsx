import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { getLocalStorageWithExpiry } from '../helpers/auth/authFn';
import Logo from '../assets/necleo.svg';
import Profile from '../assets/profile.png';
import { useUpdate } from '../context/hasUpdated';
import SampleProjectSvg from './svg/SampleProjectSvg';
import IntroSvg from './svg/IntroSvg';
import AppsSvg from './svg/AppSvg';
import MyProjectsSvg from './svg/MyProjectsSvg';
import Help from './svg/Help';
import Feedback from './svg/Feedback';
import CloseModal from './svg/CloseModal';

const Navbar = () => {
  const { toggleOffcanvas, sideBarOptions, setSideBarOptions } = useUpdate();
  const token = getLocalStorageWithExpiry('auth')?.token;
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    setAuth({
      ...auth,
      user: null,
      token: ''
    });
    navigate('/');
  };

  const handleItemClick = (clickedIndex) => {
    setSideBarOptions(prevOptions => {
      const updatedOptions = prevOptions.map((option, index) => ({
        ...option,
        isActive: index === clickedIndex,
      }));
      return updatedOptions;
    });
  };


  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light sticky-top">
        <div className="container-fluid">
          <NavLink className="navbar-brand ms-3" >
            <img onClick={toggleOffcanvas} data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling" src={Logo} className='img-fluid' alt='logo' />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              {token ? (<>
                <li className='nav-item'>
                  <b className='lead' style={{ fontWeight: "500" }}>Free Trial&nbsp;|</b> <span className='mx-1'>2 days left</span>
                  <br />
                  <span className='' style={{ fontWeight: "500", color: "#FA782F" }}>Extend free trial</span>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    &nbsp;<img src={Profile} alt='logo' className='img-fluid' style={{ width: '45px', height: '45px' }} />

                  </a>
                  <ul style={{ cursor: "pointer" }} className="dropdown-menu  dropdown-menu-end">
                    <li className='dropdown-item'>Welcome {auth?.user?.username}</li>
                    <li className="dropdown-item text-danger" onClick={handleLogout}>Logout</li>
                  </ul>
                </li>
              </>) : (<></>)}
            </ul>
          </div>
        </div>
      </nav>
      <div>
        <div className="offcanvas offcanvas-start" style={{ marginTop: "4.7em" }} data-bs-scroll="true" data-bs-backdrop="false" tabIndex={-1} id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">

          <div className="offcanvas-body" style={{ cursor: 'pointer' }}>
            <ul className='list-unstyled mx-3' style={{ fontSize: "1.2em" }}>
              <hr />
              <li className={`my-3 ${sideBarOptions[3].isActive ? 'active_side' : ''}`} onClick={() => handleItemClick(3)}>
                <MyProjectsSvg isActive={sideBarOptions[3].isActive} />
                <span className='mx-3'>My Projects</span>
              </li>
              <li className={`my-3 ${sideBarOptions[0].isActive ? 'active_side' : ''}`} onClick={() => handleItemClick(0)}>
                <SampleProjectSvg isActive={sideBarOptions[0].isActive} />
                <span className='mx-3'>Sample</span>
              </li>
              <hr />
              <li className={`my-3 ${sideBarOptions[1].isActive ? 'active_side' : ''}`} onClick={() => handleItemClick(1)}>
                <AppsSvg isActive={sideBarOptions[1].isActive} />
                <span className='mx-3'>Apps</span>
              </li>
              <li className={`my-3 ${sideBarOptions[2].isActive ? 'active_side' : ''}`} onClick={() => handleItemClick(2)}>
                <IntroSvg isActive={sideBarOptions[2].isActive} />
                <span className='mx-3'>Intro</span>
              </li>
            </ul>
          </div>

          <div className='offcanvas-footer' >
            <div className='offcanvas-body'>
            <div className='d-flex justify-content-start'>
              <ul className='list-unstyled mx-3' style={{ fontSize: "1.2em", cursor: "pointer" }}>
                <hr />
                <li className={`my-3 ${sideBarOptions[4].isActive ? 'active_side' : ''}`} onClick={() => handleItemClick(4)}>
                  <Help isActive={sideBarOptions[4].isActive} />
                  <span className='mx-3'>Help</span>
                </li>
                <li className={`my-3 ${sideBarOptions[5].isActive ? 'active_side' : ''}`} onClick={() => handleItemClick(5)}>
                  <Feedback isActive={sideBarOptions[5].isActive} />
                  <span className='mx-3'>Feedback</span>
                </li>
                <hr />
                <li className='my-3' onClick={toggleOffcanvas} data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
                  <CloseModal />
                  <span className='mx-3'>Close</span>
                </li>


              </ul>
            </div>
            </div>
          </div>


        </div>
      </div>

    </>
  );
};

export default Navbar;
