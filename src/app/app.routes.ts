import { Routes } from '@angular/router';
import { PaginaLoginComponent } from './pagina-login/pagina-login.component';
import { PaginaHomeComponent } from './pagina-home/pagina-home.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: PaginaLoginComponent }, // Página de login
  { path: 'home', component: PaginaHomeComponent, canActivate: [AuthGuard] }, // Protege a rota home
];

export default routes;
