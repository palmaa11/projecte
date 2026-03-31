import { CommonModule } from '@angular/common';
import { Component, OnInit, NgZone } from '@angular/core';
import { GraphqlService } from '../../services/graphql.service';

@Component({
  selector: 'app-home-offers',
  imports: [CommonModule],
  templateUrl: './home-offers.html',
  styleUrl: './home-offers.scss'
})
export class HomeOffers implements OnInit {
  products: any[] = [];
  loading = true;

  constructor(
    private graphql: GraphqlService,
    private ngZone: NgZone
  ) {}

  async ngOnInit() {
    console.log('ngOnInit executat');

    try {
      const data: any = await this.graphql.getOffers();
      console.log('DATA:', data);

      this.ngZone.run(() => {
        this.products = data?.offerProducts ?? [];
        console.log('PRODUCTS:', this.products);
        this.loading = false;
      });
    } catch (error) {
      console.error('Error carregant ofertes:', error);

      this.ngZone.run(() => {
        this.products = [];
        this.loading = false;
      });
    }
  }
}
