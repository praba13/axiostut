var express = require('express');
var router = express.Router();

const axios = require('axios');

/* GET home page. */
router.get('/', async function (req, res, next) {
  const idVal = req.query.id;
  /*
   axios
    .get('https://jsonplaceholder.typicode.com/todos/5')
    .then(function (response) {
      res.render('index', { title: response.data.title });
    })
    .catch(function (error) {
      console.log(error);
    });
    */

  axios
    .get('https://jsonplaceholder.typicode.com/todos/', {
      params: { id: idVal }
    })
    .then(function (response) {
      //res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

  axios
    .post('https://jsonplaceholder.typicode.com/posts', {
      title: 'PR-Axios',
      body: 'PR-Body'
    })
    .then(function (response) {
      //res.send(response.data);
    })
    .catch(function (e) {
      console.log(e);
    });

  axios
    .put('https://jsonplaceholder.typicode.com/posts/' + idVal, {
      title: 'PR-Axios Updated',
      body: 'PR-Body Updated'
    })
    .then(function (response) {
      //res.send(response.data);
    })
    .catch(function (e) {
      console.log(e);
    });

  axios
    .delete('https://jsonplaceholder.typicode.com/posts/1')
    .then(function (response) {
      //res.send('Data Deleted successfully');
    })
    .catch(function (e) {
      console.log(e);
    });
});

module.exports = router;
