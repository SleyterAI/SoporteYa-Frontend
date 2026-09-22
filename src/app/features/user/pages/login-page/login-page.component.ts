import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthCookieService } from '../../services/auth-cookie.service';

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
  private readonly authCookieService = inject(AuthCookieService);
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

    this.authCookieService.login(request).subscribe({
      next: () => {
        console.log('Inicio exitoso');
        if (this.authCookieService.isAdmin()) this.router.navigate(['ticket-board-page']);
        else this.router.navigate(['ticket-form']);
      },
      error: (error) => {
        console.error('login-form: ', error);
      }
    });
  }
}
