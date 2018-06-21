import { NativeStorage } from '@ionic-native/native-storage';
import firebase from 'firebase/app';
import { DatabaseProvider } from './../providers/database/database';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AuthentificationPage } from '../pages/authentification/authentification';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = AuthentificationPage;

  config = {
    apiKey: "AIzaSyDVUMjRPw-fX2EDvK0CkLIvzDiBQbY9CaU",
    authDomain: "discookv2.firebaseapp.com",
    databaseURL: "https://discookv2.firebaseio.com",
    projectId: "discookv2",
    storageBucket: "discookv2.appspot.com",
    messagingSenderId: "28515334502"
  };

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private database: DatabaseProvider, private storage:NativeStorage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      firebase.initializeApp(this.config);

      database.getIngredients().then(result => {
        console.log(result);

        storage.setItem("IngredientsList",result);
      });

      statusBar.styleBlackTranslucent();
      statusBar.backgroundColorByHexString("#000000");
      splashScreen.hide();
    });
  }
}

