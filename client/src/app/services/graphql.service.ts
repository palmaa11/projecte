import { Injectable } from '@angular/core';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core';
import { HttpLink } from '@apollo/client/link/http';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  private apollo: ApolloClient;

  constructor() {
    const link = new HttpLink({
      uri: 'http://localhost:4000/graphql'
    });

    this.apollo = new ApolloClient({
      link,
      cache: new InMemoryCache()
    });
  }

  async getOffers() {
    const result = await this.apollo.query({
      fetchPolicy: 'network-only',
      query: gql`
        query {
          offerProducts {
            id
            name
            image
            catalogPrice
            offerPrice
            discountPercent
          }
        }
      `
    });

    return result.data;
  }

  async getTopCategories() {
    const result = await this.apollo.query({
      fetchPolicy: 'network-only',
      query: gql`
        query {
          topCategories {
            id
            name
            level
          }
        }
      `
    });

    return result.data;
  }

  async getSubcategories(parentId: string) {
    const result = await this.apollo.query({
      fetchPolicy: 'network-only',
      query: gql`
        query($parentId: ID!) {
          subcategories(parentId: $parentId) {
            id
            name
            level
          }
        }
      `,
      variables: {
        parentId
      }
    });

    return result.data;
  }

  async getProductsByCategory(categoryId: string) {
    const result = await this.apollo.query({
      fetchPolicy: 'network-only',
      query: gql`
        query($categoryId: ID!) {
          productsByCategory(categoryId: $categoryId) {
            id
            code
            name
            shortDescription
            image
            catalogPrice
          }
        }
      `,
      variables: {
        categoryId
      }
    });

    return result.data;
  }

  async getProductDetail(id: string) {
    const result = await this.apollo.query({
      fetchPolicy: 'network-only',
      query: gql`
        query($id: ID!) {
          productDetail(id: $id) {
            id
            code
            name
            shortDescription
            longDescription
            image
            catalogPrice
            offerPrice
            discountPercent
            offerEndDate
            categoryId
          }
        }
      `,
      variables: {
        id
      }
    });

    return result.data;
  }
}