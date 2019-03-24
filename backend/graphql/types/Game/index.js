export default `
  type Variable {
    key: String!
    value: String!
  }
  type Game {
    _id: String!
    admin: User!
    template: Template!
    variables: [Variable]!
  }
  type Query {
    game(_id: String!): Game
    games: [Game]
  }
  type Mutation {
    addGame(admin: String!, template: String!): Game
    editGame(_id: String!, key: String!, value: String): Game
    deleteGame(_id: String!): Game
  }
`;
