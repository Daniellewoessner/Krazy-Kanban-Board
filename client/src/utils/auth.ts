import { JwtPayload, jwtDecode } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
  username?: string;
}

class AuthService {
  getProfile(): CustomJwtPayload | null {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode<CustomJwtPayload>(token);
      } catch (error) {
        return null;
      }
    }
    return null;
  }

  loggedIn(): boolean {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }
  
  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.exp) {
        return decoded.exp < Date.now() / 1000;
      }
      return true; // if there's no expiration, consider it expired
    } catch (err) {
      return true;
    }
  }

  getToken(): string {
    return localStorage.getItem('id_token') || '';
  }

  login(idToken: string): void {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout(): void {
    localStorage.removeItem('id_token');
    window.location.assign('/login');
  }
}

export default new AuthService();