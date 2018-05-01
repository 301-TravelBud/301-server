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
// process.env.DATABASE_URL = 'postgres://postgres:1234@localhost:5432/travelapp';
process.env.DATABASE_URL = 'postgress://mason:Zaqwsx12345!@localhost:5432/'
// Database Setup
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://epkccoenjyskis:58e01cf0fbb5289e6fd83aa142ff61e25949d287a00c19468caea6353ed5b12a@ec2-54-204-46-236.compute-1.amazonaws.com:5432/d4bj4v6b2vvvmq'
);
client.connect();
client.on('error', err => console.error(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/', (req, res) => res.redirect(CLIENT_URL));
app.get('/test', (req, res) => res.send('hello world'));


app.get('/trips', (req, res) => {
  console.log('in trips')
  client.query('SELECT * FROM trips;')
    .then(results =>{
console.log('results: ',results)
     res.send(results.row)
    })
    .then(console.log('retriev'))
    .catch(console.error);

});




app.get('*', (req, res) => res.redirect(CLIENT_URL));

loadDB();
app.listen(PORT, () => console.log(`listening on port: ${PORT}`));

function loadDB() {

  client.query(`
    CREATE TABLE IF NOT EXISTS
    users (
      user_id SERIAL PRIMARY KEY,
      user_name VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR (255) UNIQUE NOT NULL,
      public BOOLEAN,
      password VARCHAR(255)
    );`
  )
    // .then(loadUsers)
    .catch('create table if not exist catch users',console.error);

  client.query(`
    CREATE TABLE IF NOT EXISTS
    trips (
      trips_id SERIAL PRIMARY KEY,
      user_id INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(user_id),
      country VARCHAR(100) NOT NULL,
      city VARCHAR(100),
      start_date DATE,
      end_date DATE
    );`
  )
    // .then(loadtrips)
    .catch('create table if not exist catch trips',console.error);
}
