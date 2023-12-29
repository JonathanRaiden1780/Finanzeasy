import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private loadingCtrl : LoadingController) { }
  
  async showLoading(message : string, time: boolean = true ) {
    if(time){    
      const loading = await this.loadingCtrl.create({
        message: message,
        duration: 1000,
      });
      loading.present();
    }
    else{
      const loading = await this.loadingCtrl.create({
        message: message
      });
      loading.present();
    }
  }
  closeLoading(){
    this.loadingCtrl.dismiss();
  }
}
