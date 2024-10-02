import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private readonly apiUrl = 'http://localhost:3000/auth/login';

  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<any> {
    return this.http
      .post<{ token: string }>(this.apiUrl, { email, senha })
      .pipe(
        tap((response) => {
          console.log(
            'AuthService: Recebido token do backend:',
            response.token
          );
          localStorage.setItem('authToken', response.token);
          this.isAuthenticated = true;
        })
      );
  }

  logout(): void {
    console.log('AuthService: Fazendo logout...');
    localStorage.removeItem('authToken');
    this.isAuthenticated = false;
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
    this.isAuthenticated = true;
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    console.log('AuthService: Verificando token no localStorage:', token);

    if (token) {
      const decodedToken = this.parseJwt(token);
      console.log('AuthService: Token decodificado:', decodedToken);

      if (decodedToken && decodedToken.exp) {
        const expDate = decodedToken.exp * 1000;
        console.log(
          'AuthService: Data de expiração do token:',
          new Date(expDate)
        );

        if (Date.now() < expDate) {
          console.log('AuthService: Token válido.');
          this.isAuthenticated = true;
          return true;
        } else {
          console.log('AuthService: Token expirado.');
          this.logout();
        }
      } else {
        console.log('AuthService: Token inválido.');
        this.logout();
      }
    } else {
      console.log('AuthService: Nenhum token encontrado.');
    }

    this.isAuthenticated = false;
    return false;
  }

  private parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('AuthService: Erro ao decodificar o token:', error);
      return null;
    }
  }
}
