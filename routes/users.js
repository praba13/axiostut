var express = require('express');
var router = express.Router();
const axios = require('axios');
const { request } = require('../app');

/* GET users listing. */
router.get('/', async function (req, res, next) {
  //Interceptors Request with Axios
  //Req. Interceptors -> modify/update your req before Api ist is called
  //Res. Interceptors -> when u received the res -> modify/update/processing/transform

  axios.interceptors.request.use(
    (request) => {
      request.headers['startTime'] = new Date();
      request.headers['secretKey'] = 'blabla';
      return request;
    },
    (error) => {
      return Promise.reject('Unable to make request');
    }
  );

  axios.interceptors.response.use(
    (response) => {
      response.headers['organizationVerified'] = true;
      return response;
    },
    (error) => {
      return Promise.reject('Unable to Process to Response');
    }
  );

  //Headers with Axios
  axios
    .post(
      'https://jsonplaceholder.typicode.com/todosss/',
      {
        title: 'PR-Axios Header',
        body: 'PR-Body Header'
      },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: false,
        auth: {
          username: 'testing',
          password: 'testing'
        }
      }
    )
    .then(function (response) {
      //console.log(response);
      //res.send('Posted Data with Headers');
    })
    .catch(function (e) {
      if (e.response) {
        //We made a Api call -> we got response from server
        //From Server when weg get error -> 5xx
        console.log(e.status);
        if (e.status === 500) {
          console.log('Server is not available');
        }
        console.log(e.data);
        console.log(e.headers);
      } else if (e.request) {
        console.log(e.request);
        console.log(e.data);
      } else {
        console.log('Something bad happend' + e.message);
      }
    });

  //Concurrent Requests with Axios

  const promise1 = axios.get('https://jsonplaceholder.typicode.com/todos/1', {
    headers: { 'Accept-Encoding': 'gzip, deflate, compress' }
  });
  const promise2 = axios.get('https://jsonplaceholder.typicode.com/users/1', {
    headers: { 'Accept-Encoding': 'gzip, deflate, compress' }
  });
  const promise3 = axios.get('https://jsonplaceholder.typicode.com/posts/1', {
    headers: { 'Accept-Encoding': 'gzip, deflate, compress' }
  });

  Promise.all([promise1, promise2, promise3])
    .then(function (results) {
      const combinedData = {
        todosData: results[0].data,
        usersData: results[1].data,
        postsData: results[2].data
      };
      console.log(combinedData);
    })
    .catch(function (e) {
      console.log(e);
    })
    .finally(() => {
      res.send('Concurrent Request Completed');
    });
});

module.exports = router;
