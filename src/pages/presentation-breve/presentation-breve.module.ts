import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PresentationBrevePage } from './presentation-breve';

@NgModule({
  declarations: [
    PresentationBrevePage,
  ],
  imports: [
    IonicPageModule.forChild(PresentationBrevePage),
    PipesModule
  ],
})
export class PresentationBrevePageModule {}
