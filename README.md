
## **To use the application in its' current state, a Spotify account is required and a song must be "active" (must have recently hit play, paused, or controlled playback in some way).**

# SoundUp
## A node-based web application with a React front-end, designed to let people interact with the playlist being played wherever they are. (uses Spotify API)

## Steps to access run the application locally:
1) Download a local copy of the repository
2) In the root directory, run "npm install"
3) ... cd into client, run "npm install"
4) ... cd back to the root
5) ... cd into authoritzation-server/authorization_code, 
6) ... run "nodemon app.js" (or "node app.js")
7) In another terminal, navigate to the project's root directory
8) ... then run "npm start" to launch the react application



### This project features an authorization server stored and hosted separately from our React express server, in an effort to isolate private information and create a more secure environment. Currently this is complicating the process of deployment to Heroku.
- Running nodemon on app.js (in the authorization directory) allows for the authentication redirect on localhost:8888 
- Running npm start in the root directory launches the React application on localhost:3000


-------------

## With SoundUp, venue managers and event hosts can invite guests and visitors shape their playlist by voting for their choice of the next song to play -- adding a new interactive dynamic to parties, venues, festivals and events and elevate the soundtrack wherever people gather. 


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

 

 
# HomePage 
![Alt text](/client/src/images/SoundUp_homepage.gif "Homepage")
<br />

# Authentication with Spotify API
![Alt text](/client/src/images/SoundUp_authentication.gif "Homepage")

# Admin (Room.js) populates playlists and "now playing"
![Alt text](/client/src/images/SoundUp_SpotifyPopulate.gif "Homepage")

# Select a Playlist > generate dynamic URL for visitors > randomize 6 vote choices
![Alt text](/client/src/images/SoundUp_PickPlaylist_RandomizeVotes.gif "Homepage")


## From here, our back-end database routes need significant debugging and building out, but the design is to use a database as the middleman to pass vote options from Admin (Room.js) to Visitor view (VisitorRoom.js). When "Launch your room to let the people vote!" is clicked, a dynamic + shareable URL will be generated and VisitorView.js would render using the Admin settings (Session).

## Visitors to the respective room (Session) will be able to tap a randomized option to vote for a song to play next. Every time a song transition occurs, the database updates to reflect vote totals for each vote option. The Admin connection to the Spotify API will then make a call to queue the winning song to play next (using vote vount and song ID from Session data in database), randomize 6 new vote options, and pass them back to the Visitor view for voting.

## The cycle repeats, with a new set of randomized options being generated and passed to the Visitor view every time the song changes.
