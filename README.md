# Stuff n' Stuff
## Pitch
  Have you ever wondered how many kumquats fit into a standrd refrigerator, how many hard drives fit into an olympic swimming pool or how many potatoes would be required to make your own planet. Maybe not, but it is helpful to make big numbers understandable to an average person. speechwriters and authors alike can take advntage of the flavorful analogies made possible by filling things with other things
## pages
###  Homepage
  The basic functionality for filling things with other things will be readily available here.
  ![Doodle of Home Page Layout](https://github.com/Stuart-Y/startup/blob/main/homepage%20doodle_page-0001.jpg)

### Profile Page
Here data about peoples use of the site is made visible and interpreted in a fun way. Also Includes a Dad Joke service for added entertainment value
![Doodle of a User Page](https://github.com/Stuart-Y/startup/blob/main/User%20Page%20Doodle_page-0001.jpg)

### Custom Item Page
Here logged in users can create their own items to fill with things or to be put in things.
![Doodle of custom item generating page](https://github.com/Stuart-Y/startup/blob/main/Custom%20Item%20Page_page-0001.jpg)

### Why?
Why? 
![why](https://github.com/Stuart-Y/startup/blob/main/Why%20Page_page-0001.jpg)

### Internet Proofing (beyond current scope)

## Stack Description
### HTML
mark up text with exciting formating lines and boxes for basic components
### CSS
fonts and some fonts and some dynamic styling
### Javscript
Login, calculations for how many things fit, dynamic lists of other users activities and user data
### React
Acts as a frame to wrap reusable HTML elements, handles interactions with local storage and sends out mock websocket events, acts as middleware as well
  - Custom and User pages are only accessible  and visible while authenticated
  - Calculator has basic functionality, it can run calculations for volume-based packing, current bugs, dropdown menus sometimes decide to usee the first element rather than the selected element active shape based packing algorithms are unimplemented
  - User generated Items saved locally and are viewed on the user page and accessible on the calculator
  - User generated items are tracked for most popular and displayed on User page 
  - Fill events simulated like a websocket for user page

### Service
dad jokes
local server handles custom items and login endpoints
### DB/Login
user credentials and custom object and previous calculations

## Phase 1: HTML
Wrote HTML code
Programmed radio buttons
Created a custom jpeg of a question mark
Designd and programmed headers and footers
Made div for websocket - calls for random dad jokes :)

## Phase 2: CSS
Established layouts for object selection, content pages and user information
Selected readable, interesting fonts
Established color scheme

## Phase 3: React
Retool HTML to single page React webpage
Handle Authentication states and middleware redirects
attach hooks for service endpoints
mock up long term data storage with local storage

## Phase 4: Services
created local service to handle most data
adapt custom item form to send to local 
adapt calculator to request custom items from server
attach user pge to grab favorite item and used items from local service
added dad joke service to user page
