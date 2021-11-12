import * as rxjs from 'rxjs';
import { AuthService } from 'services';

import { config } from './environment';

export class LoginService {
  public login(cb: (token: any) => void = () => {}) {
    const login$: rxjs.Observable<string> = (window as any).Eduzz.Accounts.login(config.ACCOUNT_PARTNER, {
      env: config.ACCOUNT_ENV
      // redirectTo: this.options?.redirectTo || window.location.href,
      // bg: this.options?.bg,
      // logo: this.options?.logo,
      // logo: logoSpace
      // create: this.options?.create || undefined,
      // register: this.options?.register || undefined,
      // btnColor: '#ff00ff',
      // dark: true
      // email: this.options?.email || undefined
    }).subscribe(async (token: any) => {
      localStorage.setItem('logado', 'true');
      try {
        const result = await AuthService.login(token); //Aqui sera retornado o JWT
        if (process.env.REACT_APP_API_ENV === 'staging' || process.env.REACT_APP_API_ENV === 'development') {
          localStorage.setItem('token dev', `${result.data.token_type} ${result.data.token}`);
        }
        cb(result.data);
        if (window.location.pathname === '/login') {
          window.history.pushState(null, '', '/');
        } else {
          window.history.pushState(null, '', window.location.pathname);
          localStorage.removeItem('fromLogin');
        }
      } catch {
        window.history.pushState(null, '', '/');
        this.logout();
      }
    });
  }

  public logout() {
    localStorage.removeItem('logado');
    localStorage.removeItem('fromLogin');
    (window as any).Eduzz.Accounts.logout({
      env: config.ACCOUNT_ENV
      // redirectTo: 'https://store.eduzz.com/'
    });
  }
}

const loginService = new LoginService();
export default loginService;
