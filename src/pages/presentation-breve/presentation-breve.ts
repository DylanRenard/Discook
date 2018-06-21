import { NativeStorage } from '@ionic-native/native-storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Recette } from '../../providers/database/recette';

@IonicPage()
@Component({
  selector: 'page-presentation-breve',
  templateUrl: 'presentation-breve.html',
})
export class PresentationBrevePage {
  recette:Recette;
  favoris:boolean = false;
  tempsTotal:number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:NativeStorage) {
    this.recette=navParams.get('recette');
    storage.getItem('favorisList').then( value => {
      value.forEach( recetteFav => {
        if(recetteFav.id == this.recette.id) this.favoris = true;
      });
    });
    this.tempsTotal = parseInt(this.recette.tempsPreparation) + parseInt(this.recette.tempsCuisson);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PresentationBrevePage');
  }

  changePage(page:string){
    switch (page){
      case ('parametre'):
        this.navCtrl.push(`ParametrePage`);
        break;
      case ('favoris'):
        this.navCtrl.push(`FavorisPage`);
        break;
    }
  }

  addFav(){
    this.favoris = !this.favoris;
  }

  editer(){
    //this.navCtrl.push(`AjoutRecettePage`,{recette : this.recette});
  }
  
  voir(){
    //this.navCtrl.push(`PresentationCompletePage`,{recette : this.recette});
  } 
  
  commencer(){
    //this.navCtrl.push(`ListeIngredientPage`,{recette : this.recette});
  }
}
