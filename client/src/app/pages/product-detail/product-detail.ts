import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { GraphqlService } from '../../services/graphql.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss'
})
export class ProductDetail implements OnInit {
  product: any = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private graphql: GraphqlService,
    private cdr: ChangeDetectorRef,
    private cartService: CartService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error = 'No s’ha indicat cap producte.';
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }

    try {
      const data: any = await this.graphql.getProductDetail(id);
      this.product = data?.productDetail ?? null;

      if (!this.product) {
        this.error = 'No s’ha trobat el producte.';
      }
    } catch (error) {
      console.error('Error carregant la fitxa del producte:', error);
      this.error = 'Error carregant la fitxa del producte.';
      this.product = null;
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  addToCart() {
    if (!this.product) return;

    this.cartService.addToCart({
      id: this.product.id,
      name: this.product.name,
      image: this.product.image,
      price: this.product.offerPrice ?? this.product.catalogPrice,
      quantity: 1
    });

    alert('Producte afegit a la cistella');
  }
}
