const { buildSchema } = require('graphql');

//* scalar JSON: Used to create custom type to represent JSON structures
exports.graphQLschema = buildSchema(`
    scalar JSON

    type Query {
        getAllPrompts: [Prompt]
        searchPrompts(name: String, tag: String): [Prompt]
    }

    type Prompt {
        _id: ID!
        user: String
        name: String
        type: String
        data: JSON
        tags: [String]
        results: [JSON]
    }
`);