import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterLinkWithHref,   CommonModule,ReactiveFormsModule, FormsModule]
})
export class RegisterPage implements OnInit {

  constructor() { }
  formLogin = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl(''),
    
});
  ngOnInit() {
  }
  onLogin(){
    console.log(this.formLogin)
  }
  onLoginGoogle(){
    console.log(this.formLogin)
  }
}

