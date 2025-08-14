import { Injectable, signal } from '@angular/core';

/**
 * localstorage declaration
 */
declare const localStorage: Storage;

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly TOKEN_KEY = 'auth_token';
  private readonly EXPIRATION_KEY = 'token_expiration';

  public hasValidToken = signal<boolean>(false);


  constructor() { 
    this.checkToken();
  }

  public setToken(token: string, expiration: number): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    const expirationDate = new Date().getTime() + expiration * 1000;
    localStorage.setItem(this.EXPIRATION_KEY, expirationDate.toString());
    this.hasValidToken.set(true);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public checkToken(): boolean {
    const token = this.getToken();
    const expiration = localStorage.getItem(this.EXPIRATION_KEY);
    
    const isValid = !!token && !!expiration && Date.now() < parseInt(expiration, 10) * 1000;
    

    if (!isValid) {
      this.clearAuthData();
    }
    
    this.hasValidToken.set(isValid);
    return isValid;
  }

   public clearAuthData(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.EXPIRATION_KEY);
    this.hasValidToken.set(false);
  }

  public removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.EXPIRATION_KEY);
    this.hasValidToken.set(false);
  }
}
