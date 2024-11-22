import React from 'react';

export function Login() {
  return (
    <main className='container-fluid bg-secondary text-center'>
      <div id="logMain" class="content">
        <h1>Login</h1>
        <input type="text" placeholder="username" className='fancyBox'/>
        <input type="text" placeholder="password" className='fancyBox'/>
      </div>
    </main>
  );
}