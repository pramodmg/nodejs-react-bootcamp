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

router.get('/users', function(req, res) {
  axios
    .get('https://randomuser.me/api/?results=30')
    .then((response) => {
      let { results } = response.data;
      res.send(results)
    })
    .catch((err) => {
      console.log(res)
      res.send(err.stack)
    });
});


app.use(router);

app.listen('8989', function() {
	console.log('Server started at 8989');
});