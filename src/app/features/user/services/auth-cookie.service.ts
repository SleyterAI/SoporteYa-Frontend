import { Injectable, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment';
import { LoginRequestDto, LoginResponse, LoginResponseDto } from "../interfaces/login.interface";
import { Observable, tap } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { JwtPayload } from '../interfaces/jwt.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthCookieService {
  private platformId = inject(PLATFORM_ID);
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/auth`;

  private tokenSignal = signal<string | null>(this.getCookie('access_token'));

  public isAuthenticated = computed(() => !!this.tokenSignal());

  public userRole = computed(() => {
    const token = this.tokenSignal();
    if (!token) return null;
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.role;

  });
  public isAdmin = computed(() => this.userRole() === 'ROLE_ADMIN');
  public isUser = computed(() => this.userRole() === 'ROLE_USER');

  public userEmail = computed(() => {
    const token = this.tokenSignal();
    if (!token) return null;
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.sub; //email = sub
  });

  getEmail(): string | null {
    return this.userEmail();
  }

  login(request: LoginRequestDto): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, request)
      .pipe(
        tap(response => {
          this.setToken(response.token);
        }));
  }

  /* Guardar token en la cookie */
  setToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      // Configuramos la cookie: expira en 1 día (86400 segundos), ruta raíz y segura
      document.cookie = `access_token=${token}; path=/; max-age=86400; SameSite=Lax`;
      this.tokenSignal.set(token);
    }
  }

  getToken(): string | null {
    return this.tokenSignal();
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      document.cookie = 'access_token=; path=/; max-age=0;';
      this.tokenSignal.set(null);
    }
  }

  private getCookie(name: string): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
}
