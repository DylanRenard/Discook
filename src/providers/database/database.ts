import { Utilisateur } from './utilisateur';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as firebase from 'firebase';

import { Ingredient, Recette, Etape } from './recette';
import { RecetteSearch } from './recetteSearch';
import { resolveDefinition } from '@angular/core/src/view/util';

@Injectable()
export class DatabaseProvider {
  
  constructor(public http: HttpClient) {
    console.log('Hello DatabaseProvider Provider');
  }

  //retourne la liste de tous les ingredients
  //appelee au lancement de l'application
  getIngredients(): Promise<Ingredient[]> {
    console.log("=======================GetAllIngredient==============================\n");

    let listeIngredient:Ingredient[] = [];

    return new Promise<Ingredient[]>( resolve => {
      firebase.database().ref("Ingredient").once('value', itemSnapShot => {
        console.log("=====================================================================");
        console.log("table : " + itemSnapShot.key);
        console.log("=====================================================================");
        console.log("=====================================================================");

        itemSnapShot.forEach( item => {
          console.log("item : " + item.key + "\nnom : " + item.val().nom + "\n=====================================================================");

          let ingredient = item.val() as Ingredient;
          ingredient.id = item.key;

          listeIngredient.push(ingredient);
        })
      }).then(() => {
        listeIngredient.sort((one:Ingredient, two:Ingredient) => (one.nom > two.nom ? 1 : -1));
        resolve(listeIngredient);
      });
    });
  }

  //retourne toutes les recettes de la BDD
  //a eviter d'utiliser, si il y a beaucoup de recettes ca posera des problemes (memoire et temps)
  //actuellement appelee au chargement de la page home
  getRecettes(): Promise<Recette[]> {
    console.log("=======================GetRecettes==============================\n");

    let listeRecette: Recette[] = [];

    return new Promise<Recette[]>( resolve => {
      firebase.database().ref("Recette").once('value', table => {
        console.log("table : " + table.key + "\n=====================================================================");

        table.forEach( recetteData => {
          console.log("item : " + recetteData.key + "\nnom : " + recetteData.val().nom + "\n=====================================================================");

          let recetteSearch = recetteData.val() as RecetteSearch;
          let recette = this.recetteSearch2Recette(recetteSearch);

          let promiseListEtape: Promise<Etape>[] = [];

          if(recetteSearch.etapes!=undefined) {
            recetteSearch.etapes.forEach( id => {
              promiseListEtape.push(this.getEtape(id));
            });
          }

          Promise.all(promiseListEtape).then( result => {
            console.log("\tListe des etapes : " + result);

            recette.etapes = result;

            let promiseListIngredient: Promise<Ingredient>[] = [];

            if(recetteSearch.ingredients!=undefined){
              for(let i = 0 ; i<recetteSearch.ingredients.length ; i++){
                promiseListIngredient.push(this.getIngredient(recetteSearch.ingredients[i]));
              }
            }

            Promise.all(promiseListIngredient).then( result => {
              console.log("\tListe des ingredients : " + result);

              recette.ingredients = result;
              listeRecette.push(recette);
            });
          });
        });
      }).then( () => {
        resolve(listeRecette)
      });
    });
  }

  //retourne l'etape, d'une recette, d'id : id
  //appelee par getRecettes
  getEtape(id):Promise<Etape>{
    return new Promise<Etape>( resolve => {
      firebase.database().ref("Etape/" + id).once('value', etapeData => {
        let etape = etapeData.val() as Etape;
        resolve(etape);
      });
    });
  }

  //retourne l'ingredient complet d'une recette
  //appelee par getRecette
  getIngredient(ingredient:Ingredient):Promise<Ingredient>{
    return new Promise<Ingredient>( resolve => {
      firebase.database().ref("Ingredient/" + ingredient.id).once('value', ingredientData => {
        let asIngredientData = ingredientData.val() as Ingredient;
        ingredient.nom = asIngredientData.nom;
        ingredient.image = asIngredientData.image;

        resolve(ingredient);
      });
    });
  }

  //convertie un RecetteSearch en Recette
  //les champs ingredients et etapes sont recuperes apres dans la fonction qui l'appelle
  //appelee par getRecette
  recetteSearch2Recette(rs:RecetteSearch):Recette {
    let recette = new Recette();

    recette.id = rs.id;

    recette.nom = rs.nom;
    recette.presentation = rs.presentation;
    recette.image = rs.image;
    
    recette.difficulte = rs.difficulte;
    recette.nombreDePersonne = rs.nombreDePersonne;
    recette.tempsPreparation = rs.tempsPreparation;
    recette.tempsCuisson = rs.tempsCuisson;

    return recette;
  }

  //ajoute ou met a jour une recette dans la base de donnees
  addRecette(recette:Recette,update?:boolean){
    let recetteId;

    console.log("update : " + update)
    if(update==undefined) {
      update=false;
    }
    console.log("update : " + update)
    if(update) {
      this.deleteRecette(recette);
    }

    firebase.database().ref("Recette").once('value', table => {
      if(!update) {
        let num = table.numChildren()+1;
        recetteId = num + "_" + recette.nom;
      }
      else recetteId = recette.id;
      console.log("recette.id : " + recetteId);

    }).then( () => {
      let etapesId: string[] = [];

      recette.etapes.forEach(etape => {
        etape.id = recetteId + "_Etape_" + etape.numero;
        this.addEtape(etape);
        etapesId.push(etape.id);
      });

      firebase.database().ref("Recette/" + recetteId).set({
        nom : recette.nom,
        presentation : recette.presentation,
        image : recette.image,
        difficulte : recette.difficulte,
        nombreDePersonne : recette.nombreDePersonne,
        tempsPreparation : recette.tempsPreparation,
        tempsCuisson : recette.tempsCuisson,
        etapes : etapesId,
        motsCles : recette.motsCles
      }).then( () => {
        recette.ingredients.forEach(ingredient => {
          firebase.database().ref("Recette/" + recetteId + "/ingredients/" + ingredient.id).set({
            quantite : ingredient.quantite,
            unite : ingredient.unite
          });
        });
      });
    });
  }

  //ajoute une etape dans la base de donnees
  //appelee par addRecette
  addEtape(etape:Etape){
    firebase.database().ref("Etape/" + etape.id).set({
      numero : etape.numero,
      texte : etape.texte,
      annotation : etape.annotation
    });
  }

  //ajoute un nouvel ingredient dans la base de donnees
  addIngredient(nomIngredient:string, imageIngredient:string){
    firebase.database().ref('Ingredient/').push().set({
      nom: nomIngredient,
      image: imageIngredient
    });
  }

  //supprime une recette de la base de donnees
  //appelee par addRecette dans le cas d'une mise a jour
  deleteRecette(recette:Recette){
    console.log("=====================================================================");
    console.log("=====================================================================");
    console.log("Delete Recette");
    console.log("=====================================================================");
    console.log("=====================================================================");

    recette.etapes.forEach(etape => {
      firebase.database().ref('Etape/' + etape.id).remove();
    });

    firebase.database().ref('Recette/' + recette.id).remove();
  }

  //permet de se connecter
  //renvoie l'id de l'utilisateur si la connexion a réussi, 'mdp' si le mot de passe n'est pas correct, 'pseudo' si le pseudo est inconnu
  login(utilisateur:Utilisateur):Promise<string>{
    let findPseudo:boolean=false;
    
    return new Promise<string>( resolve => {
      firebase.database().ref('Utilisateur').once('value', table => {
        table.forEach( user => {
          let userData:Utilisateur = user.val() as Utilisateur;
          if(!findPseudo && userData.pseudo == utilisateur.pseudo){
            findPseudo = true;
            if(userData.mdp == utilisateur.mdp) resolve(user.key);
            else resolve('mdp');
          }
        });
        resolve('pseudo');
      });
    });
  }

  //permet de s'enregistrer dans la base de données
  //renvoie l'id de l'utilisateur si l'inscription a réussi, null sinon (pseudo déjà utilisé)
  inscription(utilisateur:Utilisateur):Promise<string>{
    return new Promise<string>( resolve => {
      this.login(utilisateur).then( value => {
        if(value!='pseudo') resolve(null);
        else {
          firebase.database().ref('Utilisateur/').push().set({
            pseudo: utilisateur.pseudo,
            mdp: utilisateur.mdp
          }).then( () => {
            this.login(utilisateur).then( value => resolve(value));
          });
        }
      });
    });
  }

  //permet de modifier le mot de passe
  //renvoie TRUE si la modification a été effectuée, FALSE sinon (oldMDP incorrect)
  changerMDP(utilisateur:Utilisateur, newMDP):Promise<boolean>{
    return new Promise<boolean>( resolve => {

      firebase.database().ref('Utilisateur/' + utilisateur.id).once('value', user => {
        let userData:Utilisateur = user.val() as Utilisateur;
        if(userData.mdp != utilisateur.mdp) resolve(false);
        else firebase.database().ref('Utilisateur/' + utilisateur.id).set({
          pseudo: utilisateur.pseudo,
          mdp: newMDP
        }).then( () => {
          resolve(true);
        });
      });
    });
  }
}