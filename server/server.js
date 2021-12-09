const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());


const articlesRoute = require('./controllers/articles')

server.use('/articles', articlesRoute)


// Root route
server.get('/', (req, res) => res.send('Hello, world!'))

module.exports = server
