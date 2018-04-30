'use strict';

// Application dependencies
const express = require('express');
const cors = require('cors');
const pg = require('pg');
const superagent = require('superagent');
const bodyparser = require('body-parser');

// Application Setup
const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL;


// Database Setup
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

app.get('/test', (req, res) => res.send('hello world'));
app.get('/', (req, res) => res.redirect(CLIENT_URL));


// app.get('/api/v1/books', (req, res) => {
//   client.query('SELECT * from books;')
//     .then(results => res.send(results.row))
//     .catch(console.error);

// });


app.get('*', (req, res) => res.sendStatus('you didnt get there'));



app.listen(PORT, () => console.log(`listening on port: ${PORT}`));


function loadDB() {
  client.query(`
    CREATE TABLE IF NOT EXISTS
    users (
      user_id SERIAL PRIMARY KEY,
      user_name VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR (255) UNIQUE NOT NULL,
      public BOOLEAN,
    );`
  )
    // .then(loadUsers)
    .catch(console.error);

  client.query(`
    CREATE TABLE IF NOT EXISTS
    trips (
      trips_id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(user_id),
      country VARCHAR(100) NOT NULL,
      city VARCHAR(100),
      start_date DATE,
      end_date DATE,
    );`
  )
    // .then(loadtrips)
    .catch(console.error);
}
