const gql = String.raw;
const typeDefs = gql `
    type Reaction {
        reactionBody: String
        username: String
        createdAt: String
    }

    type Thought {
        _id: ID
        thoughtText: String
        createdAt: String
        username: String
        reactions: [Reaction]
        reactionCount: Int
    }

    type User {
        _id: ID
        username: String
        email: String
        password: String
        thoughts: [Thought]
        friends: [User]
        friendCount: Int
    }

    type Query {
        getUserById(userId: ID): User
        getAllUsers: [User]
        getThoughtById(thoughtId: ID): Thought
        getAllThoughts: [Thought]
    }

    type Mutation {
        createUser(username: String! email: String!, password: String!): User
        updateUser(userID: ID!, username: String, email: String, password: String): User 
        deleteUser(userID: ID!): User
        addFriend(userID: ID!, friendId: ID!): User
        removeFriend(userID: ID!, friendId: ID!): User

        createThought(username: String!, thoughtText: String!): Thought
        updateThought(thoughtId: ID!, thoughtText: String!): Thought
        deleteThought(thoughtId: ID!): Thought

        addReaction(thoughtId: ID!, reactionBody: String!, username: String!): Thought
        deleteReaction(thoughtId: ID!, reactionId: ID!): Thought
    }
`;
export default typeDefs;
