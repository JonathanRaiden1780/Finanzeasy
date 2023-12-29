import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLinkWithHref } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';
import { CommonService } from 'src/app/services/common-service';
import { IonModal } from '@ionic/angular/common';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterLinkWithHref, CommonModule, FormsModule, ReactiveFormsModule],
})
export class LoginPage implements OnInit {  
  private readonly authServ = inject(AuthService);
  private readonly commonServ = inject(CommonService);
  @ViewChild(IonModal) modal!: IonModal;
  isModalOpen: boolean = false;
  user$!: Observable<User | null>
  formLogin = new FormGroup({
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")] }),
    password: new FormControl<string>('', { nonNullable: true }),
  });
  canDismiss: boolean = false;
  presentingElement: Element | null = null;

  constructor() { }
  
  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
  }
  onLogin() {
    var email = this.formLogin.controls.email.value;
    var password = this.formLogin.controls.password.value;
    this.authServ.signIn(email, password)
  }
  onLoginGoogle() {
    this.authServ.signInGoogle();
  }

  confirm() {
    var email = this.formLogin.controls.email.value;
    this.authServ.resetPassword(email);
    this.canDismiss = true;
    this.setModal(false)
  }

  setModal(open: boolean) {
    this.isModalOpen = open;
    this.canDismiss = !open ? true: false;
  }
}
