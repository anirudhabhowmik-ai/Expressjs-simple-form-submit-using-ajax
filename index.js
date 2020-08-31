const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const fs = require('fs');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ 
    extended: true
}))

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

// app.get('/check/endpoint', (req, res)=> {
//    res.send({
//        status: 200,
//        message: 'API is working fine !'
//    })
// });

app.post('/submitdata', function (req, res) { 
    console.log(chalk.green(req.body));
    var response = {
        first_name:req.body.first_name,
        last_name:req.body.last_name
    };
    console.log(chalk.bgYellow(JSON.stringify(response)));
    fs.writeFile('entry.json', JSON.stringify(response),function(err) { //Design to send the data to the server and It carry unlimited data any any type of data, like image, mp3, mp4, video e.t.c
        if (err) throw err;
        console.log(chalk.green('File Saved!'));
    })
    res.end(JSON.stringify(response));
})

var server = app.listen(3000, function () {
   var port = server.address().port
   console.log(chalk.green("Example app listening at - ", port))
})
