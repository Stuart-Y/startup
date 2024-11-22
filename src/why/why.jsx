import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './why.css';

export function Why() {
  return (
    <main className='container-fluid bg-secondary text-center'>
      <div className="why">
        <h1>WHY ?</h1>
         <p id="pretentious">
            One word, <em>Scale</em>, people aren't very good at it. Sure mountains are big but how many dumptrucks would it 
            take to move one? How many quarks fit in a grain of sand? How many wombats fit in a standard broom closet?
            These are important questions, especially to authors and certain species of journalists. It it my dream that this somehow prompts 
            an xkcd comic or two somehow. The math for these things can be finicky hopefully these are some useful tools
        </p>
      </div>
    </main>
  );
}