import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; // Adiciona essa importação

@Component({
  selector: 'app-pagina-login',
  standalone: true,
  templateUrl: './pagina-login.component.html',
  styleUrls: ['./pagina-login.component.css'],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule, // Adiciona essa importação aqui
  ],
})
export class PaginaLoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
    });
  }
  //autenticacao funcionando fazer um commit
  onLogin(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const senha = this.loginForm.get('senha')?.value;

      this.authService.login(email, senha).subscribe({
        next: (response) => {
          console.log('Resposta do backend:', response);
          if (response.accessToken) {
            this.authService.setToken(response.accessToken); // Armazena o token
            this.router.navigate(['/home']); // Redireciona para a página home
          } else {
            console.error('Token não recebido do backend.');
          }
        },
        error: (err) => {
          console.error('Erro ao autenticar:', err);
        },
      });
    }
  }
}
