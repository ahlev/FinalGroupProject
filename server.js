const express = require('express');
const app = express();
const PORT = process.env.PORT || 9000;

// Listener that supports server interaction (required)
app.listen(PORT, () => {
    console.log('Server is starting at ... + ', PORT);
});


//
// Routes
//


// Route for index
app.get('/', (req, res) => {
    res.json({
        message: 'Ok" '
    });
});



/////////////////////////////////////

    // Line 1 and 2 is requiring Express and allows us to use it inside of our server.js file.
    // Line 3 is setting the port that our Express server will be running on.
    // Lines 6-8 will simply console.log a message that will let us know our server is up and running.
    // Line 17-20 is setting up a GET route that we will eventually be fetched from within our client side React application.

// Since we have a React app AND an Express app running...
    // We have to run them at the same time.
    // In this project, we installed the package 'concurrently' 
    // ... and created a script to start both express and react (npm start)