import { Routes } from '@angular/router';
import { HomeOffers } from './pages/home-offers/home-offers';
import { Categories } from './pages/categories/categories';
import { Search } from './pages/search/search';
import { ProductDetail } from './pages/product-detail/product-detail';
import { Cart } from './pages/cart/cart';

export const routes: Routes = [
  { path: '', component: HomeOffers },
  { path: 'categories', component: Categories },
  { path: 'search', component: Search },
  { path: 'product/:id', component: ProductDetail },
  { path: 'cart', component: Cart }
];
