// sets the environment variables

require("dotenv").config();

// variables for liri

// variables for spotify
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var Spotify = require("node-spotify-api");

// use moment to pull the date of events 

var moment = require("moment");   
moment().format(); 

// use axios package to to retrieve data from apis
var axios = require("axios")

// use fs node package to take text from random.txt
var fs = require("random.txt")

// arguement for the switch statement
var commandLiri = process.argv[2]; 

var value = process.argv[3];

switch(commandLiri) {
    case "concert-this":
        concertThis(value);
        break; 

    case "spotify-this-song":
        spotifyThis(value);
        break;
    
    case "movie-this":
        movieThis(value);
        break;

    case "do-what-it-says":
        doSays(value);
        break;

    default: 
    console.log("Not recgonized command. Please these commands only for the liri app: concert-this, spotify-this-song, movie-this, do-what-it-says");
}