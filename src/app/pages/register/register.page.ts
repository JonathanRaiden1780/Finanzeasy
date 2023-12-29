import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLinkWithHref } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterLinkWithHref,   CommonModule,ReactiveFormsModule, FormsModule]
})
export class RegisterPage implements OnInit {
  private readonly authServ = inject(AuthService);
  constructor() { }
  formLogin = new FormGroup({
    email: new FormControl<string>('',{nonNullable:true,validators:[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]}),
    password: new FormControl<string>('',{nonNullable: true}),
});
  ngOnInit() {
  }
  signUp(){
    var email = this.formLogin.controls.email.value;
    var password = this.formLogin.controls.password.value;
    this.authServ.signUp(email, password)
  }
  onLoginGoogle(){
    this.authServ.signInGoogle();
  }
}

