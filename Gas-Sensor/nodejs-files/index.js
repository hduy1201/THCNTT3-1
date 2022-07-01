
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());// express > 4.16
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
var fs = require('fs');

//get all item in colleciton
app.get("/api/music", async function (request, response) {
    try {
        var files = fs.readdirSync('../src/assets/music/');
        console.log(files);
        response.send(files);
        return files;
    } catch (err) {
      console.log(err);
      response.json(err);
    }
});

let PORT = 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server starting on http://127.0.0.1:${PORT} `);
});

