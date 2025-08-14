import { CommonModule } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FloatLabel } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

import { CategoriesService } from '../../core/services/categories.service';
import { ProductsService } from '../../core/services/products.service';
import { iCreateProductRequest } from '../../shared/interfaces/products.response';


@Component({
  selector: 'app-product-register',
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    InputNumberModule,
    ButtonModule, 
    InputTextModule,
    FloatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './product-register.component.html',
  styleUrl: './product-register.component.scss',
  providers: [MessageService]
})
export class ProductRegisterComponent {
// Datos del producto
  product = signal({
    name: '',
    description: '',
    price: null as number | null,
    stock: null as number | null,
    category_name: ''
  });

  private _productsService = inject(ProductsService);
  private fb: FormBuilder = inject(FormBuilder);
  private _categoriesService = inject(CategoriesService);
  private dialogRef = inject(DynamicDialogRef);



  // Opciones de categorías (ejemplo)
  categories: WritableSignal<{name: string, code: string}[]> = signal([]);

    productForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.maxLength(200)]],
    price: [null as number | null, [Validators.required, Validators.min(0)]],
    stock: [null as number | null, [Validators.required, Validators.min(0)]],
    category_name: ['', Validators.required]
  });

  constructor() {
    this._categoriesService.getCategories().subscribe({
      next: (categories) => {
        this.categories.set(
          categories.map(category => ({
            name: category.name,
            code: category.id.toString()
          }))
        );
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }


  onSubmit(): void {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;
      const productRequest: iCreateProductRequest = {
        name: formValue.name ?? '',
        description: formValue.description ?? '',
        price: formValue.price ?? 0,
        stock: formValue.stock ?? 0,
        category_name: formValue.category_name ?? ''
      };
      this._productsService.createProducts(productRequest).subscribe({
        next: (response: unknown) => {
          console.log("🚀 ~ ProductRegisterComponent ~ onSubmit ~ response:", response)
                    this.dialogRef.close(response);
          this.resetForm();
        },
        error: (error: unknown) => {
  
          console.error('Error al crear el producto:', error);
        }
      });
    }
  }

  resetForm(): void {
    this.product.set({
      name: '',
      description: '',
      price: null,
      stock: null,
      category_name: ''
    });
  }
}
