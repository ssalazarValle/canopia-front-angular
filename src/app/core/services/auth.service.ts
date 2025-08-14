import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { catchError, Observable, tap, throwError } from 'rxjs';

import { iErrorLogn, iLoginResponse } from '../../shared/interfaces/login.response';
import { iResponseRegister } from '../../shared/interfaces/register.user';

import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuthenticated = signal<boolean>(false);
  public isLoading = signal<boolean>(false);
  public error = signal<string | null>(null);

  private http: HttpClient = inject(HttpClient);
  private tokenService: TokenService = inject(TokenService);
  private router: Router = inject(Router);
  private apiUrl: string;

  

  constructor() {
    this.apiUrl = `${environment.baseUrl}`;

    // this.isAuthenticated.set(this.tokenService.hasValidToken());
  }

  public login(credentials: {username: string, password: string}): Observable<iLoginResponse> {
    this.isLoading.set(true);
    this.error.set(null);

    return this.http.post<iLoginResponse>(`${this.apiUrl}/api/auth/login`, credentials).pipe(
      tap((response: iLoginResponse) => {
        this.tokenService.setToken(response.token, response.expiresAt);
        this.isAuthenticated.set(true);
        this.isLoading.set(false);
      }),
      catchError((err: iErrorLogn) => {
        this.error.set(err.error || 'Error during login');
        this.isLoading.set(false);
        return throwError(() => err);
      })
    );
  }

  public register(userData: {username: string, email: string, 
    password: string, role: string}): Observable<iResponseRegister> {
    this.isLoading.set(true);
    this.error.set(null);

    return this.http.post<iResponseRegister>(`${this.apiUrl}/api/auth/register`, userData).pipe(
      tap(() => {
        this.isLoading.set(false);
      }),
      catchError((err: iErrorLogn) => {
        this.error.set(err.error || 'Error during registration');
        this.isLoading.set(false);
        return throwError(() => err);
      })
    );
  }

  public logout(): void {
    this.tokenService.removeToken();
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

}
