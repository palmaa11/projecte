export const typeDefs = /* GraphQL */ `
  type Category {
    id: ID!
    name: String!
    parentId: ID
    level: Int!
  }

  type Product {
    id: ID!
    code: String!
    name: String!
    shortDescription: String!
    longDescription: String!
    image: String!
    catalogPrice: Float!
    categoryId: ID!
    createdAtProduct: String!
    deletedAt: String
  }

  type OfferProduct {
    id: ID!
    code: String!
    name: String!
    shortDescription: String!
    longDescription: String!
    image: String!
    catalogPrice: Float!
    offerPrice: Float!
    discountPercent: Float!
    startDate: String!
    endDate: String
    categoryId: ID!
  }

  type Query {
    hello: String!
    topCategories: [Category!]!
    subcategories(parentId: ID!): [Category!]!
    productsByCategory(categoryId: ID!): [Product!]!
    offerProducts: [OfferProduct!]!
  }
`;