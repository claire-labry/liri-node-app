# LIRI Bot

LIRI, like SIRI [but different], is a Language Interpretation and Recognition Interface in Javascript. Functioned as a command line node app, it takes parameters and gives back data to the user. 

### Description of LIRI Bot

This particular LIRI Bot has been developed to grab and search Bands in Town, OMDB, & Spotify APIs. The commands have been developed in the liri.js file. These commands bring information about bands, songs and movies. Information is not only produced in the terminal, but it is stored in a random.txt file. The commands devised in liri.js are: 

1. concert-this
2. movie-this
3. spotify-this-song
4. do-what-it-says

### How to use LIRI Bot

Type in the terminal: node liri.js concert-this <artist/band name here>

This will prompt the terminal to pull information about the band's: 

* Name of the venue
* Venue location
* Date of the Event

![](gif_demos/concert-this.GIF)

Type in the terminal: node liri.js spotify-this-song <song name here>

This will prompt the terminal to pull information about the song's: 

* Artist(s)
* The song's name
* A preview link of the song from Spotify
* The album that the song is from

![](gif_demos/spotify-this-song.GIF)

Type in the terminal: node liri.js spotify-this-song <movie name here>

This will prompt the terminal to pull information about the movie's: 

  * Title of the movie.
  * Year the movie came out.
  * IMDB Rating of the movie.
  * Rotten Tomatoes Rating of the movie.
  * Country where the movie was produced.
  * Language of the movie.
  * Plot of the movie.
  * Actors in the movie.

![](gif_demos/movie-this.GIF)

### Technology 

* Node.js
* Axios
* Moment
* DotEnv

### APIs

* Bands In Town
* Spotify API
* OMDB API