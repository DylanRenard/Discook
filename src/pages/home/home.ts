import { Ingredient } from './../../providers/database/recette';
import { NativeStorage } from '@ionic-native/native-storage';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public storage: NativeStorage) {

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

  test(){
    this.storage.getItem("IngredientsList").then( result => {
      let ingredients:Ingredient[] = [];
      let ingredient1:Ingredient = result[1];
      let ingredient2:Ingredient = result[2];
      let ingredient3:Ingredient = result[3];

      ingredient1.quantite = 1;
      ingredient1.unite = "";

      ingredient2.quantite = 2;
      ingredient2.unite = "kg";

      ingredient3.quantite = 3;
      ingredient3.unite = "l";

      ingredients.push(ingredient1);
      ingredients.push(ingredient2);
      ingredients.push(ingredient3);

      this.navCtrl.push(`TestPage`,{ingredients:ingredients})
    })
  }
}
