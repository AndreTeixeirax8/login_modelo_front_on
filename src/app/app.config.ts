import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import routes from './app.routes';
import { AuthGuard } from './auth.guard';

export const appConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes), // Aqui o AuthGuard já está incluído nas rotas
    AuthGuard,
  ],
};
