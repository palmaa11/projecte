import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CartItem, CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart implements OnInit {
  items: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.items = this.cartService.getCart();
  }

  increase(item: CartItem) {
    this.cartService.updateQuantity(item.id, item.quantity + 1);
    this.loadCart();
  }

  decrease(item: CartItem) {
    this.cartService.updateQuantity(item.id, item.quantity - 1);
    this.loadCart();
  }

  remove(item: CartItem) {
    this.cartService.removeFromCart(item.id);
    this.loadCart();
  }

  clearCart() {
    this.cartService.clearCart();
    this.loadCart();
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  getTotalItems(): number {
    return this.cartService.getTotalItems();
  }
}