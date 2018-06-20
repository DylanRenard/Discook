import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavorisPage } from './favoris';

@NgModule({
  declarations: [
    FavorisPage,
  ],
  imports: [
    IonicPageModule.forChild(FavorisPage),
    PipesModule
  ],
})
export class FavorisPageModule {}
