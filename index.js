const express = require('express')
const bodyParser = require('body-parser');
const connection = require('./database/db');
const Artist = require('./models/artist');
const request = require('request')


const client_id = process.env.CLIENT_ID;
const client_secret = process.env.SECRET_KEY;

const app = express();
app.use(bodyParser.json());

let apiData = {};


// https://api.spotify.com/v1/search?q=thetitle&type=track
// https://api.spotify.com/v1/search?q=isrc:USEE10001992&type=track
// test https://api.spotify.com/v1/search?q=remaster%2520track%3ADoxy%2520artist%3AMiles%2520Davis&type=album
var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: {
        grant_type: 'client_credentials'
    },
    json: true
}

// request.get(authOptions, function (error, response, body) {
//     if (!error && response.statusCode === 200) {
//         var token = body.access_token;
//         console.log(token)

//     }
// })

// {"album": {
//     "album_type": "album",
//         "artists": [
//             {
//                 "external_urls": {
//                     "spotify": "https://open.spotify.com/artist/4F84IBURUo98rz4r61KF70"
//                 },
//                 "href": "https://api.spotify.com/v1/artists/4F84IBURUo98rz4r61KF70",
//                 "id": "4F84IBURUo98rz4r61KF70",
//                 "name": "The White Stripes",
//                 "type": "artist",
//                 "uri": "spotify:artist:4F84IBURUo98rz4r61KF70"
//             }
//         ]
// }}


app.get("/musics", (req, res) => {
    try {
        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var token = body.access_token;
                var options = {
                    url: 'https://api.spotify.com/v1/search?q=thetitle&type=track',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                    json: true
                };

                request.get(options, function (error, resp, body) {
                    if (resp.statusCode === 200) {
                        res.status(200).json(body.tracks.items)
                        //console.log(body.tracks.items)
                    }
                    else {
                        return []
                    }
                })
            }


        })
    } catch (error) {
        console.log(error);
    }

})

app.get("/musics/:isrc", (req, res) => {
    const isrc = req.params.isrc
    try {
        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var token = body.access_token;
                var options = {
                    url: `https://api.spotify.com/v1/search?q=isrc:${isrc}&type=track`,
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                    json: true
                };

                request.get(options, function (error, resp, body) {
                    //let apiResp = []
                    if (resp.statusCode === 200) {
                        res.status(200).json(body.tracks.items)
                    }
                    else {
                        return []
                    }
                })
            }

        })

    } catch (error) {
        console.log("Error :", error)

    }
})


app.post("/musics", async (req, res) => {
    try {
        const { href, name, uri, type } = req.body;
        const music = await Artist.create({
            href,
            name,
            uri,
            type
        });
        res.status(201).json(music);

    } catch (error) {
        console.log("Error :", error);
        res.status(500).json({ error: 'failed to create music track' });
    }

})


const port = 8000;
app.listen(port, () => {
    console.log(`Server is listening on: ${port}`)
})
