import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { GoogleAuthProvider, getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AuthService } from './app/services/auth.service';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
    importProvidersFrom(provideFirebaseApp(() => initializeApp({ "projectId": "finanzeasy-71d73", "appId": "1:459962167192:web:15e1df19cd2fbc0b1d05ed", "databaseURL": "https://finanzeasy-71d73-default-rtdb.firebaseio.com", "storageBucket": "finanzeasy-71d73.appspot.com", "apiKey": "AIzaSyDpg95dGk2ChxpfcGdDo7dMkV4AlrT5UoQ", "authDomain": "finanzeasy-71d73.firebaseapp.com", "messagingSenderId": "459962167192", "measurementId": "G-RVPXZDXT0D" }))), 
    importProvidersFrom(provideAuth(() => getAuth())), 
    importProvidersFrom(provideFirestore(() => getFirestore())),
    GoogleAuthProvider
  ],
});
