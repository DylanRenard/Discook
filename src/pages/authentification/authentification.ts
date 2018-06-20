import { NativeStorage } from '@ionic-native/native-storage';
import { Utilisateur } from './../../providers/database/utilisateur';
import { DatabaseProvider } from './../../providers/database/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-authentification',
  templateUrl: 'authentification.html',
})
export class AuthentificationPage {
  user:Utilisateur;
  pageMode:string = 'login';
  confirmationMDP:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database:DatabaseProvider, public toastCtrl:ToastController, private storage:NativeStorage) {
  }

  ionViewWillLoad() {
    this.user = new Utilisateur();
  }

  connexion(){
    this.database.login(this.user).then( result => {
      switch (result){
        case 'pseudo':
          let toastPseudo = this.toastCtrl.create({
            message:'Ce pseudo est inconnu',
            duration: 2000,
            position: 'bottom'
          });
          toastPseudo.present();
          break;
        case 'mdp':
          let toastMDP = this.toastCtrl.create({
            message:'Mot de passe incorrect',
            duration: 2000,
            position: 'bottom'
          });
          toastMDP.present();
          break;
        default :
          this.user.id = result;
          this.storage.setItem('user',this.user);
          let toast = this.toastCtrl.create({
            message:'Connexion réussie',
            duration: 1500,
            position: 'middle'
          });
          toast.present();
          this.navCtrl.setRoot(HomePage);
          break;
      }
    });
  }

  inscription(){
    if(this.user.mdp == this.confirmationMDP){
      this.database.inscription(this.user).then( result => {
        if(result==null) {
          let toast = this.toastCtrl.create({
            message:'Ce pseudo est déjà utilisé',
            duration: 2000,
            position: 'bottom'
          });
          toast.present();
        }
        else {
          this.user.id = result;
          this.storage.setItem('user',this.user);
          let toast = this.toastCtrl.create({
            message:'Inscription réussie',
            duration: 1500,
            position: 'middle'
          });
          toast.present();
          this.navCtrl.setRoot(HomePage);
        }
      })
    }
    else{
      let toast = this.toastCtrl.create({
        message:'Les mots de passe sont différents',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
    }
  }

  switchPageMode(){
    if(this.pageMode == 'inscription') this.pageMode = 'login'
    else this.pageMode = 'inscription';
  }
}
