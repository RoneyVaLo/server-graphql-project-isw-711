const { buildSchema } = require('graphql');
exports.graphQLschema = buildSchema(`
    type Query {
        getAllPrompts: [Prompt]
        searchPrompts(name: String, tag: String): [Prompt]
    }

    type Prompt {
        _id: ID!
        name: String
        type: String
        tags: [String]
    }
`);