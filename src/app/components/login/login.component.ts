import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PasswordModule } from 'primeng/password';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule, PasswordModule, CommonModule],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
loginForm: FormGroup;
  registerForm: FormGroup;

  errorMessage: string;
  isLoading: boolean;
  isFlipped: boolean;

  private fb: FormBuilder = inject(FormBuilder);
  protected authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private messageService: MessageService = inject(MessageService);

  constructor() {
    this.errorMessage = '';
    this.isLoading = false;
    this.isFlipped = false;

    // Formulario login
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // Formulario registro
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['user', Validators.required]
    });
  }

  toggleFlip(): void {
    console.log('Toggling flip. Current state:', this.isFlipped);
    this.isFlipped = !this.isFlipped;
  }

  onLoginSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/home']);
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Error en el inicio de sesión';
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: this.errorMessage
          });
          this.isLoading = false;
        }
      });
    }
  }

  onRegisterSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Registro exitoso',
            detail: 'Ahora puedes iniciar sesión'
          });
          this.toggleFlip(); // volver al login
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Error en el registro';
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: this.errorMessage
          });
          this.isLoading = false;
        }
      });
    }
  }
}
