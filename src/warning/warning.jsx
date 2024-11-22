import React from 'react';
import './warning.css';

export function Warning() {
  return (
    <main className='container-fluid bg-secondary text-center'>
        <div id="WarningMain" class="content">
          <h1>I Wish I Didn't Need This Page</h1>
            <p>
                I am aware of some corners of the internet and can imagine some less savory imagery 
                generated that this websites premise might render. I choose not to host this on my site. Sorry for the 
                inconvenience but certain items and combinations of items I have chosen to prohibit. 
            </p>
        </div>
    </main>
  );
}