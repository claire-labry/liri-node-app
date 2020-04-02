// sets the environment variables

require("dotenv").config();

// variables for liri

// variables for spotify
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

// use moment to pull the date of events 

var moment = require("moment");   
moment().format(); 

// use axios package to to retrieve data from apis
var axios = require("axios")

// use fs node package to take text from random.txt
// var fs = require("random.txt")

// arguement for the switch statement
var commandLiri = process.argv[2]; 

var value = process.argv[3];

// calls the functions and puts the values in their consecutive groups
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
        doIt(value);
        break;

    // if user puts in a wrong command
    default: 
    console.log("Not recgonized command. Please these commands only for the liri app: concert-this, spotify-this-song, movie-this, do-what-it-says");
};

function concertThis(value) {
    axios.get("https://rest.bandsintown.com/artists/"+ artist + "/events?app_id=codingbootcamp").then(
        function(response){

            for(var i = 0; i < response.data.length; i++){
                
                var datetime = response.data[i].datetime;
                var dateArray = datetime.split(" ");

                var concertChoice = 

                "-------------Concert Choice-------------" +
                "\n Venue Name: " + response.data[i].venue.name +
                "\n City: " + response.data[i].venue.city +
                "\n Country: " + response.data[i].venue.country +
                "\n Date: " + moment(dateArray[0]).format("MM/DD/YYYY")

                console.log(concertChoice);

            } 
        }
    )}; // End Syntax for concert-this