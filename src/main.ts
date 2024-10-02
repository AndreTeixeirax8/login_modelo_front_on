import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { PaginaLoginComponent } from './app/pagina-login/pagina-login.component';
import { PaginaHomeComponent } from './app/pagina-home/pagina-home.component';
import { Routes } from '@angular/router';
import routes from './app/app.routes';

// Definição das rotas
//const routes: Routes = [
// { path: '', component: PaginaLoginComponent },
//  { path: 'home', component: PaginaHomeComponent },
//];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Adiciona o HttpClient
    provideRouter(routes), // Configura o roteamento
  ],
}).catch((err) => console.error(err));
