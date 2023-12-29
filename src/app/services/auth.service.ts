import { Injectable, inject } from '@angular/core';
import { signInWithRedirect, Auth, GoogleAuthProvider, authState, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, getRedirectResult, user, signInWithPopup } from '@angular/fire/auth';
import {  sendPasswordResetEmail } from "@firebase/auth";
import { ErrorResponse } from '../Interfaces/ErrorResponse';
import { User } from 'firebase/auth';
import { Router } from '@angular/router';
import { CommonService } from './common-service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  private readonly commonServ = inject(CommonService);
  private readonly googleProvider = inject(GoogleAuthProvider);
  constructor() { }

  get userState$() {
    var session = authState(this.auth)
    setTimeout(() => {
      session.subscribe({
        next: (data) => {          
          if (data)
            this.router.navigate(['/home']);
          else
            this.router.navigate(['/login']);
        }
      })
    }, 2000);
    return session
  }

  async signInGoogle(): Promise<void> {
    this.commonServ.showLoading('Redireccionando', false)
    try {
      const user = await signInWithPopup(this.auth, this.googleProvider)
      if(user){
        this.commonServ.closeLoading();
      }        
    }
    catch (error) {
      this.commonServ.closeLoading();
      alert('Hubo un problema con el servicio de autenticación favor de reportar al administrador')
      console.log('Google login: ', error);
    }
  }
  async signUp(email: string, password: string): Promise<void> {
    this.commonServ.showLoading('Registrando', false)
    try {
      const { user } = await createUserWithEmailAndPassword(this.auth, email, password);
      await this.sendEmailVerification(user);
      this.router.navigate(['/verify-email']);
      this.commonServ.closeLoading();
    }
    catch (error: unknown) {
      this.commonServ.closeLoading();
      alert('Hubo un problema con el servicio de autenticación favor de reportar al administrador')
      const { code, message } = error as ErrorResponse;
      console.log("code: ", code, " message: ", message);
    }
  }
  async signIn(email: string, password: string): Promise<void> {
    this.commonServ.showLoading('Iniciando Sesión', false)
    try {
      const { user } = await signInWithEmailAndPassword(this.auth, email, password);
      if (!user.emailVerified) {
        this.commonServ.closeLoading();
        await this.sendEmailVerification(user);
        this.router.navigate(['/verify-email']);
      }
      else {
        this.commonServ.closeLoading();
        this.router.navigate(['/home']);
      }
    }
    catch (error: unknown) {
      this.commonServ.closeLoading();
      const { code, message } = error as ErrorResponse;
      if(message.includes('invalid-credential'))
        alert('Error al ingresar, credenciales invalidas')
      console.log("code: ", code, " message: ", message);
    }
  }
  async signOut(): Promise<void> {
    try {
      await this.auth.signOut();
    }
    catch (error: unknown) {
      console.log(error);
    }
  }
  async resetPassword(email: string): Promise<void> {
    try {
      this.commonServ.showLoading('Enviando recuperación', false)
      await sendPasswordResetEmail(this.auth,email).finally(()=>{
        this.commonServ.closeLoading();
      });
    }
    catch (error: unknown) {
      this.commonServ.closeLoading();
      alert('Error al enviar recuperación de contraseña')
      console.log(error);
    }
  }
  async sendEmailVerification(user: User): Promise<void> {
    try {
      await sendEmailVerification(user);
    }
    catch (error: unknown) {
      console.log(error);
    }
  }
}
