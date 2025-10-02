// src/app/services/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user.model';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

export interface UserData {
  name?: string;    
  surname?: string;  
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _isUserAuthenticated = false;
  user: User | null | undefined;

  constructor(private http: HttpClient) {}

  get isUserAuthenticated(): boolean {
    return this._isUserAuthenticated;
  }

 
  register(user: UserData) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
      { email: user.email, password: user.password, returnSecureToken: true }
    );
  }

 
  logIn(user: UserData) {
    this._isUserAuthenticated = true;
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
        { email: user.email, password: user.password, returnSecureToken: true }
      )
      .pipe(
        tap((userData) => {
          const expirationTime = new Date(
            new Date().getTime() + +userData.expiresIn * 1000
          );
          const user = new User(
            userData.localId,
            userData.email,
            userData.idToken,
            expirationTime
          );
          this.user = user;
        })
      );
  }

  logOut() {
    this._isUserAuthenticated = false;
    this.user = null;
  }

  getToken(): string | null {
    return this.user ? this.user.token : null;
  }

  getUserId(): string | null {
    return this.user ? this.user.id : null;
  }
}
