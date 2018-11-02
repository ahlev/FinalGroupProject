
## **To use the application in its' current state, a Spotify account is required and a song must be "active" (must have recently hit play, paused, or controlled playback in some way).**

# SoundUp
## A node-based web application with a React front-end, designed to let people interact with the playlist being played wherever they are. (uses Spotify API)

## Steps to access run the application locally:
1) Clone or download a local copy of the repository
2) In the root run "npm i"
3) ... cd into client & run "npm i"
4) ... cd back to the root
5) ... cd into authoritzation-server/authorization_code & run "npm i"
6) ... run "nodemon app.js"
7) In a new terminal, navigate to the project's root directory
8) ... run "npm start" to launch the react application



### This project features an authorization server stored and hosted separately from our React express server, in an effort to isolate private information and create a more secure environment. Currently this is complicating the process of deployment to Heroku.
- Running nodemon on app.js (in the authorization directory) allows for the authentication redirect on localhost:8888 
- Running npm start in the root directory launches the React application on localhost:3000


-------------

## With SoundUp, venue managers and event hosts can invite guests and visitors shape their playlist by voting for their choice of the next song to play -- adding a new interactive dynamic to parties, venues and events -- even trips in the car with friends. Elevate the soundtrack wherever people gather. 


## Technology
- React + React-router
- Spotify API  + Oauth 2.0
- Node + Express
- MongoDB + Mongoose ORM
- Socket.io

- New Packages
- React-text-loop
- Concurrently 
- Spotify-web-api-js (API wrapper)
- Materialize (UI)
- dotenv
<br /><br />
 

 
# HomePage 
![Alt text](/client/src/images/SoundUp_homepage.gif "Homepage")
<br /><br />

# Authentication with Spotify API
![Alt text](/client/src/images/SoundUp_authentication.gif "Homepage")
<br /><br />

# Admin (Room.js) populates playlists and "now playing"
![Alt text](/client/src/images/SoundUp_SpotifyPopulate.gif "Homepage")
<br /><br />

# Select a Playlist > generate dynamic URL for visitors > randomize 6 vote choices
![Alt text](/client/src/images/SoundUp_PickPlaylist_RandomizeVotes.gif "Homepage")



## From here, our back-end database routes need debugging and building out -- we're shifting from trying to use socket.io (instances) to instead using a database to exchange information through (CRUD) unique "Session" documents -- but the design is to use a database as the middleman to pass vote options from the Admin setup (via a Session document) to the Visitor view. 

## When the "Launch your room to let the people vote!" button is clicked by the Admin, a unique URL will be generated (ex. /username/roomname) rendering the Visitor view, populated with the appropriate data (passing vote options, vote counts and "now playing" information through the unique Session document).

## Visitors to this unique URL will be able to tap on their choice of 6 randomized song options (from the Admin's chosen playlist) to vote for a song to play next. Every time a song transition occurs, the database will update to reflect vote totals for each vote option. which will be read by the Admin. 

## Vote totals will be read from the database by the Admin and the Spotify API will make a call to queue the winning song to play next (using vote vount and song ID from Session data in database). Six new vote options will be randomized, the database Session document will be updated and then read / rendered by the Visitor view.

## The cycle repeats, with a new set of randomized options being generated and passed to the Visitor view every time the song changes.

<br /><br />
# Sample visitor view showing how data will be set by Admin, updated in the database, read and rendered by the Visitor view (on mobile)
![Alt text](/client/src/images/VisitorView_mobile.png "Homepage")