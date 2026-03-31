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

  type SearchProduct {
    id: ID!
    code: String!
    name: String!
    shortDescription: String!
    longDescription: String!
    image: String!
    catalogPrice: Float!
    currentPrice: Float!
    discountPercent: Float!
    offerEndDate: String
    categoryId: ID!
  }

  type ProductDetail {
    id: ID!
    code: String!
    name: String!
    shortDescription: String!
    longDescription: String!
    image: String!
    catalogPrice: Float!
    offerPrice: Float
    discountPercent: Float
    offerEndDate: String
    categoryId: ID!
  }

  type Query {
    hello: String!
    topCategories: [Category!]!
    subcategories(parentId: ID!): [Category!]!
    productsByCategory(categoryId: ID!): [Product!]!
    offerProducts: [OfferProduct!]!
    searchProducts(
      text: String
      categoryIds: [ID!]
      minPrice: Float
      maxPrice: Float
    ): [SearchProduct!]!
    productDetail(id: ID!): ProductDetail
  }
`;