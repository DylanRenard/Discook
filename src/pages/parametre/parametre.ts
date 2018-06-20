import { NativeStorage } from '@ionic-native/native-storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-parametre',
  templateUrl: 'parametre.html',
})
export class ParametrePage {
  isListeDefilable:boolean;
  isLectActive:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl:ToastController, private storage:NativeStorage) {
    storage.getItem("isListeDefilable").then( value => {
      if(value!=undefined) this.isListeDefilable = value;
      else this.isListeDefilable = true;
    });
    storage.getItem("isLectActive").then( value => {
      if(value!=undefined) this.isLectActive = value;
      else this.isLectActive = true;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParametrePage');
  }

  ionViewWillLeave(){
    this.storage.setItem('isListeDefilable',this.isListeDefilable);
    this.storage.setItem('isLectActive',this.isLectActive);
  }

  supprimerFavoris(){
    this.storage.setItem('favoris',[]);
    let toast = this.toastCtrl.create({
      message:'Favoris Supprimer',
      duration: 1500,
      position: 'middle'
    });
    toast.present();
  }

  informations(){
    this.navCtrl.push(`CreditPage`);
  }
}
