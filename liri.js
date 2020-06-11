// sets the environment variables

require('dotenv').config();

// color the cli terminal based on categories

var clc = require('cli-color');

// variables for liri

// variables for spotify
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// use moment to pull the date of events

var moment = require('moment');
moment().format();

// use axios package to to retrieve data from apis
var axios = require('axios');

// use fs node package to take text from random.txt
var fs = require('fs');

// arguement for the switch statement
var commandLiri = process.argv[2];

var value = process.argv[3];

function switchCase() {
  // calls the functions and puts the values in their consecutive groups
  switch (commandLiri) {
    case 'concert-this':
      concertThis(value);
      break;

    case 'spotify-this-song':
      spotifyThis(value);
      break;

    case 'movie-this':
      movieThis(value);
      break;

    case 'do-what-it-says':
      doIt(value);
      break;

    // if user puts in a wrong command
    default:
      console.log(
        'Not recgonized command. Please these commands only for the liri app: concert-this, spotify-this-song, movie-this, do-what-it-says'
      );
  }
}

if (commandLiri === 'do-what-it-says') {
  doIt();
} else {
  switchCase();
}

function doIt() {
  // We will read the existing random.txt file
  fs.readFile('random.txt', 'utf8', function (err, data) {
    if (err) {
      console.log('Error!', err);
      return;
    }

    var txt = data.split(',');
    commandLiri = txt[0];
    value = txt.slice(1);
    switchCase();
  });
}

// function pulls the artist name from the Bands in Town API
function concertThis(artist) {
  axios
    .get(
      'https://rest.bandsintown.com/artists/' +
        artist +
        '/events?app_id=codingbootcamp'
    )
    .then(function (response) {
      // for loop that collects the data of the user's request
      for (var i = 0; i < response.data.length; i++) {
        var datetime = response.data[i].datetime;
        var dateArray = datetime.split(' ');

        var concertChoice =
          '-------------Concert Information-----------' +
          '\n Venue Name: ' +
          response.data[i].venue.name +
          '\n City: ' +
          response.data[i].venue.city +
          '\n Country: ' +
          response.data[i].venue.country +
          '\n Date: ' +
          moment(dateArray[0]).format('MM/DD/YYYY');

        console.log(clc.cyan.bold(concertChoice));

        fs.appendFile('log.txt', '\r\n' + concertChoice, function (err) {
          if (err) {
            console.log(err);
          }
        });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}

function spotifyThis(value) {
  if (!value) {
    value = 'The Sign';
  }
  spotify
    .search({
      type: 'track',
      query: value,
    })
    .then(function (response) {
      for (var i = 0; i < 3; i++) {
        var spotifyChoice =
          '-------------Spotify Choice-------------' +
          '\n Artist: ' +
          response.tracks.items[i].artists[0].name +
          '\n Song Name: ' +
          response.tracks.items[i].name +
          '\n Preview Link: ' +
          response.tracks.items[i].preview_url +
          '\n Album Name: ' +
          response.tracks.items[i].album.name;
        console.log(clc.magenta.bold(spotifyChoice));

        fs.appendFile('log.txt', '\r\n ' + spotifyChoice, function (err) {
          if (err) {
            console.log(err);
          }
        });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}

// function pulls the movie name from the OMDB API

function movieThis(movie) {
  if (!movie) {
    value = 'Mr Nobody';
    console.log(
      'If you havent watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/ \n It is on Netflix!'
    );
  }

  axios
    .get('http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&apikey=trilogy')
    .then(function (response) {
      var movieChoice =
        '-------------Movie Information-------------' +
        '\n Movie Title: ' +
        response.data.Title +
        '\n Year Released: ' +
        response.data.Year +
        '\n IMDB Rating: ' +
        response.data.imdbRating +
        '\n Rotten Tomatoes Rating: ' +
        response.data.Ratings[1].Value +
        '\n Country Produced: ' +
        response.data.Country +
        '\n Movie Language: ' +
        response.data.Language +
        '\n Movie Plot: ' +
        response.data.Plot +
        "\n Movie's Actors/Actresses: " +
        response.data.Actors;

      console.log(clc.green.bold(movieChoice));

      fs.appendFile('log.txt', '\r\n ' + movieChoice, function (err) {
        if (err) {
          console.log(err);
        }
      });
    })
    .catch(function (err) {
      console.log(err);
    });
}
