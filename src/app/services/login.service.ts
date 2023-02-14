import { Injectable } from '@angular/core';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public auth = getAuth();
  public provider = new GoogleAuthProvider();

  constructor() {}

  public async login() {
    return await signInWithPopup(this.auth, this.provider);
  }

  public async logout() {
    return await signOut(this.auth);
  }

  public async registerEmail(email: any, password: string) {
    return await createUserWithEmailAndPassword(this.auth, email, password);
  }
  
  public async loginEmail(email: any, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }
}
