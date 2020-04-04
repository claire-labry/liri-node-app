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
var axios = require("axios");

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

// function pulls the artist name from the Bands in Town API
function concertThis(artist) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function(response){
    
            // for loop that collects the data of the user's request
            for(var i = 0; i < response.data.length; i++){
                
                var datetime = response.data[i].datetime;
                var dateArray = datetime.split(" ");

                var concertChoice = 

                "-------------Concert Information-------------" +
                "\n Venue Name: " + response.data[i].venue.name +
                "\n City: " + response.data[i].venue.city +
                "\n Country: " + response.data[i].venue.country +
                "\n Date: " + moment(dateArray[0]).format("MM/DD/YYYY")

                console.log(concertChoice);

            } 
        })
        .catch(function (err) {
            console.log(err);
        });         
    }
    
    function spotifyThis(value){
        if(!value){
            value = "The Sign"; 
        }
        spotify
        .search({
            type: "track",
            query: value
        })
       .then(function(response){
          
           for(var i = 0; i < 3; i++){
               var spotifyChoice =
               "-------------Spotify Choice-------------" +
               "\n Artist: " + response.tracks.items[i].artists[0].name +
               "\n Song Name: " + response.tracks.items[i].name +
               "\n Preview Link: " + response.tracks.items[i].preview_url +
               "\n Album Name: " + response.tracks.items[i].album.name;
               console.log(spotifyChoice);
           }
       })
       .catch(function(err) {
           console.log(err);
       });
   }

    function movieThis(movie){
        axios.get("http://www.omdbapi.com/?t="+ movie + "&y=&plot=short&apikey=trilogy").then(
            function(response){
                

                var movieChoice = 

                "-------------Movie Information-------------" +

                "\n Movie Title: " + response.data.Title +
                "\n Year Released: " + response.data.Year +
                "\n IMDB Rating: " + response.data.imdbRating +
                "\n Rotten Tomatoes Rating: " + response.data.Ratings[1].Value +
                "\n Country Produced: " + response.data.Country +
                "\n Movie Language: " + response.data.Language +
                "\n Movie Plot: " + response.data.Plot +
                "\n Movie's Actors/Actresses: " + response.data.Actors 

                console.log(movieChoice);
    
                
            })
            .catch(function(err) {
                console.log(err);
            });
        }