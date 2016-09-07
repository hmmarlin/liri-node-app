var activity = process.argv[2];
var queryItem = process.argv[3]

var request = require('request');
var spotify = require('spotify');
var twitter = require('twitter');


if (activity === 'my-tweets') {

    var userKey = require('./keys.js');

    var client = new twitter({
        consumer_key: userKey.twitterKeys.consumer_key,
        consumer_secret: userKey.twitterKeys.consumer_secret,
        access_token_key: userKey.twitterKeys.access_token_key,
        access_token_secret: userKey.twitterKeys.access_token_secret
    });

    var params = { screen_name: 'hannah_marlin' };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {

            for (var i = 0; i < 20; i++) {
                console.log('------');
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);
            }
        }
    });


} else if (activity === 'spotify-this-song') {

    spotify.search({ type: 'track', query: queryItem, limit: 5 }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

        for (var i = 0; i < 5; i++) {
            var songInfo = data.tracks.items[i]

            var b = (i + 1);


            console.log('Option ' + b)
            console.log('Artist: ' + songInfo.artists[0].name)
            console.log('Song Name: ' + songInfo.name);
            console.log('Album: ' + songInfo.album.name)
            console.log('Preview link: ' + songInfo.preview_url)
            console.log('------')

        }
    });

} else if (activity === 'movie-this') {

    if (queryItem == null) {
        request('http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&r=json&tomatoes=true', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log('------')
                console.log('YOU SHOULD WATCH MR NOBODY. ITS ON NETFLIX!!!')
                console.log("The movie title is: " + JSON.parse(body)["Title"])
                console.log("The movie year is: " + JSON.parse(body)["Year"])
                console.log("The IMDB rating is: " + JSON.parse(body)["imdbRating"])
                console.log("The movie was produced in: " + JSON.parse(body)["Country"])
                console.log("The language is: " + JSON.parse(body)["Language"])
                console.log("The movie is about: " + JSON.parse(body)["Plot"])
                console.log("The actors are: " + JSON.parse(body)["Actors"])
                console.log("The rotten tomatoes score is: " + JSON.parse(body)["tomatoRating"])
                console.log("The rotten tomatoes URL is: " + JSON.parse(body)["tomatoURL"])
                console.log('------')

            }
        });

    } else {

        request('http://www.omdbapi.com/?t=' + queryItem + '&y=&plot=short&r=json&tomatoes=true', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log('------')
                console.log("The movie title is: " + JSON.parse(body)["Title"])
                console.log("The movie year is: " + JSON.parse(body)["Year"])
                console.log("The IMDB rating is: " + JSON.parse(body)["imdbRating"])
                console.log("The movie was produced in: " + JSON.parse(body)["Country"])
                console.log("The language is: " + JSON.parse(body)["Language"])
                console.log("The movie is about: " + JSON.parse(body)["Plot"])
                console.log("The actors are: " + JSON.parse(body)["Actors"])
                console.log("The rotten tomatoes score is: " + JSON.parse(body)["tomatoRating"])
                console.log("The rotten tomatoes URL is: " + JSON.parse(body)["tomatoURL"])
                console.log('------')

            }
        });

    }
} else if (activity === 'do-what-it-says') {
    var fs = require('fs');

    fs.readFile("random.txt", "utf8", function(error, data) {
        activity = data[0]
        queryItem = data[1]

        spotify.search({ type: 'track', query: queryItem, limit: 5 }, function(err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }

            for (var i = 0; i < 5; i++) {
                var songInfo = data.tracks.items[i]

                console.log('Option ' + i)
                console.log('Artist: ' + songInfo.artists[0].name)
                console.log('Song Name: ' + songInfo.name);
                console.log('Preview link: ' + songInfo.preview_url)
                console.log('Album: ' + songInfo.album.name)
                console.log('------')

            }
        });




    });

} else
    console.log('Please enter either movie, song or tweet')
