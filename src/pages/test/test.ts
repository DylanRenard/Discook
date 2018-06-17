import { DatabaseProvider } from './../../providers/database/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Recette } from '../../providers/database/recette';
import { RecetteTest } from '../../classeTest/recetteTest';

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private database:DatabaseProvider) {

    console.log("=====================================================================");
    console.log("=====================================================================");
    console.log("Test addDatabase Ingredient");
    database.addIngredient("ingredientTest","");
    console.log("=====================================================================");
    console.log("=====================================================================");

    let recetteTest:Recette = new RecetteTest();
    recetteTest.ingredients = this.navParams.get('ingredients');
    
    console.log(recetteTest);

    console.log("Test addDatabase Recette");
    database.addRecette(recetteTest);
    console.log("=====================================================================");
    console.log("=====================================================================");

    setTimeout(() => {
      recetteTest.difficulte = 3;
      recetteTest.nombreDePersonne = 3;
      recetteTest.id = "1_test";

      console.log("Test update");
      database.addRecette(recetteTest,true);
      console.log("=====================================================================");
      console.log("=====================================================================");
    },5000);
  }
}
