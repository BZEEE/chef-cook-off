
const express = require('express')
const app = express();
const fs = require('fs')
// const bodyParser = require('body-parser');

// load test data from local json file
let chefDataRaw = fs.readFileSync("chefs.json")
let chefDataJson = JSON.parse(chefDataRaw)

app.use(express.static('./dist/chef-cook-off'));

// Load the main application page from the production bundle
app.get('/', function(req, res) {
  res.sendFile('index.html', {root: './dist/chef-cook-off/'});
});

// Registration Team Endpoint
app.get('/api/registered-chefs', (req, res) => {
    // return json data of chefs from registratio team's endpoint
    res.send(chefDataJson)
});

app.listen(process.env.PORT || 8080)

