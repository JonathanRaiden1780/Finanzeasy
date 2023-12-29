import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoadingController } from '@ionic/angular/standalone';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IonicModule, RouterLinkWithHref],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private readonly authServ = inject(AuthService);
  private readonly commonServ = inject(CommonService);
  private readonly router = inject(Router);
  user$!: Observable<User | null>
  userData!: User | null
  headerOption: string = 'Inicia Sesión';
  constructor() { }

  ngOnInit() {
    this.user$ = this.authServ.userState$;
    setTimeout(() => {
      this.user$.subscribe({
        next: (data) => {
          this.userData = data;
          if (this.userData) {
            this.headerOption = 'Cerrar Sesión';
          }
        },
        error: (err) => console.log(err),
      })
    }, 100);
  }
  onActionHeader() {
    if (this.headerOption == 'Inicia Sesión') {
      this.commonServ.showLoading('Un momento');
      this.router.navigate(['/login']);
    }
    else {
      this.authServ.signOut()
      this.commonServ.showLoading('Cerrando Sesión');
      this.router.navigate(['/login']);
      this.headerOption = 'Inicia Sesión';
    }
  }

}
