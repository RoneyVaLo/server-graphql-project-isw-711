require('dotenv').config();
const jwt = require('jsonwebtoken');
const graphqlHTTP = require('express-graphql');
const { graphQLschema } = require('./graphql-schema.js');

const express = require('express');
const app = express();
// database connection
const mongoose = require("mongoose");
const db = mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
});

const theSecretKey = process.env.JWT_SECRET;


const { promptGetAll, promptSearch } = require('./controllers/promptController.js');

// parser for the request body (required for the POST and PUT methods)
const bodyParser = require("body-parser");
const cors = require("cors");



// Middlewares
app.use(bodyParser.json());
// check for cors

app.use(cors({
    domains: '*',
    methods: "*"
}));

app.use(async (req, res, next) => {

    if (req.headers["authorization"]) {
        const token = req.headers['authorization'].split(' ')[1];
        try {
            jwt.verify(token, theSecretKey, (err, decodedToken) => {
                if (err || !decodedToken) {
                    res.status(401);
                    res.json({
                        error: "Unauthorized"
                    });
                } else {
                    next();
                };
            });
        } catch (e) {
            console.log("Catch")
            res.status(422);
            res.send({
                error: "There was an error: " + e.message
            });
        }
    } else {
        console.log("Else")
        res.status(401);
        res.send({
            error: "Unauthorized "
        });
    }
});

// expose in the root element the different entry points of the
// graphQL service
const graphqlResolvers = {
    getAllPrompts: promptGetAll,
    searchPrompts: (req) => promptSearch(req),
};

app.use('/graphql', graphqlHTTP({
    schema: graphQLschema,
    rootValue: graphqlResolvers,
    graphiql: true,
}));

const PORT = 3002;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
