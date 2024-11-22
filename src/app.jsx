import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

import { Bio } from './bio/bio';
import { Custom } from './custom/custom';
import { Fill } from './fill/fill';
import { Login } from './login/login';
import { User } from './user/user';
import { Warning } from './warning/warning';
import { Why } from './why/why';

export default function App() {
  return (
    <BrowserRouter>
      <div className='body bg-dark text-light'>
        <header className='container-fluid'>
          <nav className='navbar fixed-top'>
            <div id="logo" className='navbar-brand'>
              Stuff in Stuff<sup>&reg;</sup>
            </div>
            <menu className='navbar-nav'>
              <li className='nav-item'>
                <NavLink className='nav-link' to=''>
                  Calculator
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='custom'>
                  Custom
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='user'>
                  User
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='bio'>
                  Bio
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='why'>
                  why?
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='login'>
                  login
                </NavLink>
              </li>
            </menu>
          </nav>
        </header>

        <Routes>
          <Route path='/' element={<Fill />} exact />
          <Route path='/bio' element={<Bio />} />
          <Route path='/custom' element={<Custom />} />
          <Route path='/login' element={<Login />} />
          <Route path='/user' element={<User />} />
          <Route path='/warning' element={<Warning />} />
          <Route path='/why' element={<Why />} />
        </Routes>

        <footer className='bg-dark text-white-50 fixed-bottom'>
          <div className='container-fluid'>
            <span >Storge</span>
            <a className='text-reset' href='https://github.com/Stuart-Y/startup'>
              Github
            </a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}