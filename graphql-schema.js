const { buildSchema } = require('graphql');

//* scalar JSON: Used to create custom type to represent JSON structures
exports.graphQLschema = buildSchema(`
    scalar JSON

    type Query {
        getAllPrompts(user: ID!): [Prompt]
        searchPrompts(user: ID!, name: String, tag: String): [Prompt]
    }

    type Prompt {
        _id: ID!
        user: ID!
        name: String
        type: String
        data: JSON
        tags: [String]
        results: [JSON]
    }
`);