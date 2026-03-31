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
}