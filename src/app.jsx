import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes, Navigate } from 'react-router-dom';

import { Bio } from './bio/bio';
import { Custom } from './custom/custom';
import { Fill } from './fill/fill';
import { Login } from './login/login';
import { User } from './user/user';
import { Warning } from './warning/warning';
import { Why } from './why/why';
import { AuthState } from './login/authState';

function App() {

  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  const ProtectedRoute = ({ children }) => {
    if (authState === AuthState.Unauthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }

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
              {authState === AuthState.Authenticated && (
                <li className='nav-item'>
                  <NavLink className='nav-link' to='custom'>
                    Custom
                  </NavLink>
                </li>
              )}
              {authState === AuthState.Authenticated && (
                <li className='nav-item'>
                  <NavLink className='nav-link' to='user'>
                    User
                  </NavLink>
                </li>
              )}
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
          <Route path='/' element={<Fill userName={userName} authState={authState}/>} exact />
          <Route path='/bio' element={<Bio />} />
          <Route path='/custom' element={<ProtectedRoute><Custom /></ProtectedRoute>} />
          <Route path='/login' element={<Login 
            userName={userName}
            authState={authState}
            onAuthChange={(userName,authState) => {
              setAuthState(authState);
              setUserName(userName);
            }}
            />} 
          />
          <Route 
            path='/user' 
              element={
                <ProtectedRoute>
                  <User userName={userName}/>
                </ProtectedRoute>
              } 
            />
          <Route path='/warning' element={<Warning />} />
          <Route path='/why' element={<Why />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <footer className='bg-dark text-white-50 fixed-bottom'>
          <div className='container-fluid'>
            <span className='foot-text'>Stuart "Storge" Yorgason</span>
            <a className='text-reset foot-text' href='https://github.com/Stuart-Y/startup'>
              Github
            </a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;