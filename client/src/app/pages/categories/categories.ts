import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { GraphqlService } from '../../services/graphql.service';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule],
  templateUrl: './categories.html',
  styleUrl: './categories.scss'
})
export class Categories implements OnInit {
  categories: any[] = [];
  subcategories: any[] = [];
  products: any[] = [];

  selectedCategoryName = '';
  selectedSubcategoryName = '';

  loading = true;
  loadingSubcategories = false;
  loadingProducts = false;
  error: string | null = null;

  constructor(
    private graphql: GraphqlService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    try {
      const data: any = await this.graphql.getTopCategories();
      this.categories = data?.topCategories ?? [];
    } catch (error) {
      console.error('Error carregant categories:', error);
      this.error = 'No s’han pogut carregar les categories.';
      this.categories = [];
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  async loadSubcategories(category: any) {
    this.selectedCategoryName = category.name;
    this.selectedSubcategoryName = '';
    this.products = [];
    this.loadingSubcategories = true;
    this.subcategories = [];

    try {
      const data: any = await this.graphql.getSubcategories(category.id);
      this.subcategories = data?.subcategories ?? [];
    } catch (error) {
      console.error('Error carregant subcategories:', error);
      this.subcategories = [];
    } finally {
      this.loadingSubcategories = false;
      this.cdr.detectChanges();
    }
  }

  async loadProducts(subcategory: any) {
    this.selectedSubcategoryName = subcategory.name;
    this.loadingProducts = true;
    this.products = [];

    try {
      const data: any = await this.graphql.getProductsByCategory(subcategory.id);
      this.products = data?.productsByCategory ?? [];
    } catch (error) {
      console.error('Error carregant productes:', error);
      this.products = [];
    } finally {
      this.loadingProducts = false;
      this.cdr.detectChanges();
    }
  }
}
