const express = require('express');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql')
const { schema } = require('./schema/schema')
const colors = require('colors')
const connectDB = require('./config/db')
const cors = require('cors')

app.use(cors())
const port = process.env.PORT || 5000;
const app = express();
connectDB()

const corsOptions = {
    origin: 'http://vercel.app',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use('/graphql', cors(corsOptions), graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}))

app.listen(port, console.log(`Server running on ${port}`))