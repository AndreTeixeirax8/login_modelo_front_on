import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    console.log('AuthGuard: Verificando se o usuário está autenticado...');

    const isLoggedIn = this.authService.isLoggedIn();
    console.log('AuthGuard: Resultado de isLoggedIn:', isLoggedIn);

    if (isLoggedIn) {
      console.log('AuthGuard: Usuário autenticado. Acesso permitido.');
      return true;
    } else {
      console.log(
        'AuthGuard: Usuário não autenticado. Redirecionando para a página de login...'
      );
      this.router.navigate(['']);
      return false;
    }

    /*
    console.log('AuthGuard: Sempre retornando false para testes...');
    return false;*/
  }
}
