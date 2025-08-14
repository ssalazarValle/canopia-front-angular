import { CommonModule } from '@angular/common';
import { Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TabsModule } from 'primeng/tabs';

import { CategoriesService } from '../../core/services/categories.service';
import { ProductsService } from '../../core/services/products.service';
import { iCategoriesResponse } from '../../shared/interfaces/categories.response';
import { IColumn } from '../../shared/interfaces/colummn';
import { iProductsResponse } from '../../shared/interfaces/products.response';
import { CategoriesRegisterComponent } from '../categories-register/categories-register.component';
import { ProductRegisterComponent } from '../product-register/product-register.component';
import { TableComponent } from '../table/table.component';



@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    TabsModule,
    TableComponent,
    DynamicDialogModule,
    ButtonModule
],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  providers: [DialogService]
})
export class SidebarComponent  {
  private _productsService: ProductsService = inject(ProductsService);
  private _categoriesService: CategoriesService = inject(CategoriesService);
  private dialogService = inject(DialogService);
  private dialogRef?: DynamicDialogRef;

  protected productsList: WritableSignal<iProductsResponse[]> = signal<iProductsResponse[]>([]);
  protected categoriesList: WritableSignal<iCategoriesResponse[]> = 
  signal<iCategoriesResponse[]>([]);

  
  

  protected menuMainOptions = signal<{
    label: string;
    icon: string;
    link: string;
  }[]>([]);

  public colsProducts: Signal<IColumn[]> = signal([
    { field: "id", header: "ID" },
    { field: "name", header: "Nombre" },
    { field: "description", header: "Descripción" },
    { field: "price", header: "Precio", type: "currency" },
    { field: "stock", header: "Stock", type: "number" },
    { field: "category_id", header: "Categoría" },
    { field: "created_at", header: "Fecha de creación", type: "date" },
    { field: "status", header: "Estado" }
  ]);
  
  public colsCategories: Signal<IColumn[]> = signal([
    { field: "id", header: "ID" },
    { field: "name", header: "Nombre" },
    { field: "description", header: "Descripción" },
    { field: "created_at", header: "Fecha de creación", type: "date" },
    { field: "updated_at", header: "Fecha de actualización", type: "date" }
  ]);

  constructor() { 
    this.getProducts();
    this.getCategories();
  }

  public getProducts(): void {
            this._productsService.getProducts().subscribe({
      next: (products: iProductsResponse[]) => {
        console.log('Products:', products);
        this.productsList.set(products);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }


  public getCategories(): void {
    this._categoriesService.getCategories().subscribe({
      next: (categories: iCategoriesResponse[]) => {
        console.log('Categories:', categories);
        this.categoriesList.set(categories);
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }


  public openDialog(item: string): void {
    if (item === 'product') {
      this.dialogRef = this.dialogService.open(ProductRegisterComponent, {
        header: 'Nuevo Producto',
        width: '50vw',
        height: 'max-content',
        modal: true,
        styleClass: 'opaque-modal',
        contentStyle: { 'max-height': '500px', overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: false,
        closable: true
      });

    this.dialogRef.onClose.subscribe(() => {
      this.getProducts(); 
    });
    } else if (item === 'category') {
      this.dialogRef = this.dialogService.open(CategoriesRegisterComponent, {
        header: 'Nueva Categoría',
        width: '50vw',
        modal: true,
        styleClass: 'opaque-modal',
        contentStyle: { 'max-height': '500px', overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: false,
        closable: true
      });

      this.dialogRef.onClose.subscribe(() => {
        this.getCategories();
      });
    }
  }

}
