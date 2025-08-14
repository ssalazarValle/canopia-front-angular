import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

import { CategoriesService } from '../../core/services/categories.service';
import { iCreateCategoryRequest } from '../../shared/interfaces/categories.response';

@Component({
  selector: 'app-categories-register',
  imports: [ReactiveFormsModule, FloatLabelModule, CommonModule,
    FormsModule, InputTextModule, ButtonModule],
  templateUrl: './categories-register.component.html',
  styleUrl: './categories-register.component.scss'
})
export class CategoriesRegisterComponent {
  private dialogRef = inject(DynamicDialogRef);
  private fb = inject(FormBuilder);
  private categoriesService = inject(CategoriesService);
  categoryForm = this.fb.group({
  name: ['', [Validators.required, Validators.maxLength(50)]],
  description: ['', [Validators.required, Validators.maxLength(200)]]
  });

    onSubmit(): void {
    if (this.categoryForm.valid) {
      const formValue = this.categoryForm.value;
      const categoryRequest: iCreateCategoryRequest = {
        name: formValue.name ?? '',
        description: formValue.description ?? ''
      }
      this.categoriesService.createCategory(categoryRequest).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
        },
        error: (error) => {
          console.error('Error al crear la categoría:', error);
        }
      })
    }
  }

}
