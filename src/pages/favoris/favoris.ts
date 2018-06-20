import { NativeStorage } from '@ionic-native/native-storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Recette } from '../../providers/database/recette';
import { RecetteTest } from '../../classeTest/recetteTest';

@IonicPage()
@Component({
  selector: 'page-favoris',
  templateUrl: 'favoris.html',
})
export class FavorisPage {
  favorisList:Recette[]=[new RecetteTest, new RecetteTest, new RecetteTest];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:NativeStorage) {
    storage.getItem('favorisList').then( value => {
      if(value!=undefined) this.favorisList = value;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavorisPage');
  }

  changePage(page:string){
    switch (page){
      case ('parametre'):
        this.navCtrl.push(`ParametrePage`);
        break;
      case ('favoris'):
        //this.navCtrl.push(`FavorisPage`);
        break;
    }
  }

  onClickRecette(recette:Recette){
    //this.navCtrl.push("PresentationBrevePage", { recette: recette });
  }
}
