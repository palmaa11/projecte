import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly storageKey = 'sportzone-cart';

  private cartCountSubject = new BehaviorSubject<number>(this.getTotalItems());
  cartCount$ = this.cartCountSubject.asObservable();

  private updateCartCount(): void {
    this.cartCountSubject.next(this.getTotalItems());
  }

  getCart(): CartItem[] {
    const raw = sessionStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) : [];
  }

  private saveCart(items: CartItem[]): void {
    sessionStorage.setItem(this.storageKey, JSON.stringify(items));
    this.updateCartCount();
  }

  addToCart(item: CartItem): void {
    const cart = this.getCart();
    const existing = cart.find((p) => p.id === item.id);

    if (existing) {
      existing.quantity += item.quantity;
    } else {
      cart.push(item);
    }

    this.saveCart(cart);
  }

  updateQuantity(id: string, quantity: number): void {
    const cart = this.getCart();
    const item = cart.find((p) => p.id === id);

    if (!item) return;

    if (quantity <= 0) {
      this.removeFromCart(id);
      return;
    }

    item.quantity = quantity;
    this.saveCart(cart);
  }

  removeFromCart(id: string): void {
    const cart = this.getCart().filter((p) => p.id !== id);
    this.saveCart(cart);
  }

  clearCart(): void {
    sessionStorage.removeItem(this.storageKey);
    this.updateCartCount();
  }

  getTotalItems(): number {
    return this.getCart().reduce((acc, item) => acc + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.getCart().reduce((acc, item) => acc + item.price * item.quantity, 0);
  }
}