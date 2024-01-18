# Dont Get Hacked
## The Gist
  The great thing about the internet is it is a space where basically anyone connected to it can potentially share something of themselves with everyone else there. The rough thing about the internet is that everyone includes some people you should be pretty careful around. I'm creating an safe interactive space where people can learn the common signs of dangerous elements of webpages in a fun engaging way to fine tune their senses so that when they see these things in real online situations, they will make safer decisions.  
## Structure
  There will be three kinds of pages, user profile, mock-ups, and learn more
### User Profile
  Here we'll track recent and high scores and any achievements or certificates users have earned
![Mock up of a user profile showing certificates and achievements about web threats.](https://github.com/Stuart-Y/startup/blob/main/User-Mock-Up.png)
### Mock-Ups
  Here we'll simulate several types of common webpages with simulated threats. If the user interacts with anything in a risky way, they'll lose health. At the same time, there is some task given to the user to complete for each type of webpage and a timer to complete the task, completing the task resets the timer and loads a new page. If the timer runs out or the user runs out of health the game is over and the user is sent to the **Learn More** page for the threat that lost them the most health
![Mock up of a download page with ads and fake download buttons to confuse users.](https://github.com/Stuart-Y/startup/blob/main/Mock-Up.png)
### Learn More
  Here we describe common risks found on webpages at a variety of levels 
## Class Required Elements
### Authentication
  Anyone visiting the page can spend some time practicing with the provided scenarios, but to save scores and earn a official-looking certificate, users need to create an account
### Database data
  Player scores will be saved here, as well as a collection of mock-up AD images for fake page ads and pop-up ads to be dynamically loaded in
### WebSocket data
  The page will informa all current users if high scores are updated, of if any user has earned a certificate
