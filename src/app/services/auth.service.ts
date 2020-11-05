import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  password = '';
  email = '';
  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.email = user.email;
        localStorage.setItem('user', JSON.stringify(this.email));
      } else {
        localStorage.setItem('user', null);
      }
    });
   }

  async login(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData),
        err => reject(err));
    });
  }

  getAuth(): Observable<any> {
    return this.afAuth.authState.pipe(map((auth: any) => auth));
  }

  logout(): void {
    this.afAuth.signOut();
  }

  async register(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(email, password)
        .then(userData => resolve(userData),
        err => reject(err));
    });
  }
}

