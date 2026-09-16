import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private readonly authService = inject(AuthService);

  // Estado reactivo para ver/ocultar contraseña
  showPassword = signal<boolean>(false);

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  togglePassword() {
    this.showPassword.update(value => !value);
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const request = this.loginForm.getRawValue();

    this.authService.login(request).subscribe({
      next: () => {
        console.log('Inicio exitoso');
        this.router.navigate(['ticket-board-page']);
      },
      error: (error) => {
        console.error('login-form: ', error);
      }
    });
  }
}
