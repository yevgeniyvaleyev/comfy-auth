import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainNavigationComponent } from './main-navigation.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MainNavigationComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    SharedModule,
  ],
  exports: [
    CommonModule,
    MainNavigationComponent,
  ]
})
export class CoreModule {}
