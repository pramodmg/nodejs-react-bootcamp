const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const router = express.Router();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
	console.log('route: ', req.path);
	next();
});

/**
 * Make a new Route for get users
 * fetch data from this route in react component
 */
// router.get('/users', function(req, res) {
  // Move the api call here
// });


app.use(router);

app.listen('8989', function() {
	console.log('Server started at 8989');
}); 