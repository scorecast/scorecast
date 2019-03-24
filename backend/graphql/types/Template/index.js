export default `
  type Template {
    logic: String!
    name: String!
    view: String!
    _id: String!
  }
  type Query {
    template(_id: String!): Template
    templates: [Template]
  }
`;
