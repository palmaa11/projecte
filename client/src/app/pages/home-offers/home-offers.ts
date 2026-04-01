import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { GraphqlService } from '../../services/graphql.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home-offers',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './home-offers.html',
  styleUrl: './home-offers.scss'
})
export class HomeOffers implements OnInit {
  products: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private graphql: GraphqlService,
    private cdr: ChangeDetectorRef,
    private cartService: CartService
  ) {}

  async ngOnInit() {
    console.log('ngOnInit executat');

    try {
      const data: any = await this.graphql.getOffers();
      console.log('DATA:', data);

      this.products = data?.offerProducts ?? [];
      console.log('PRODUCTS:', this.products);

    } catch (error) {
      console.error('Error carregant ofertes:', error);
      this.error = 'Error carregant les ofertes. Comprova la consola per més detalls.';
      this.products = [];
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  addToCart(product: any) {
    this.cartService.addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.offerPrice ?? product.catalogPrice,
      quantity: 1
    });

    alert('Producte afegit a la cistella');
  }
}
