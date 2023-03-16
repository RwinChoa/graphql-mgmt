const express = require('express');
const path = require('path')
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql')
const { schema } = require('./schema/schema')
const colors = require('colors')
const connectDB = require('./config/db')
const cors = require('cors')

const port = process.env.PORT || 5000;
const app = express();
app.use(cors())
connectDB()


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}))

// Serve frontend
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', (req, res) => res.sendFile(
        path.resolve(__dirname, '../', 'client', 'build', 'index.html')
    ));
} else {
    app.get('/', (req, res) => res.send('Please set to production'));
}

app.listen(port, console.log(`Server running on ${port}`))