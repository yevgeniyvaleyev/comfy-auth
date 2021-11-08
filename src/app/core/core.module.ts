import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainNavigationComponent } from './main-navigation.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MainNavigationComponent],
  imports: [RouterModule, SharedModule],
  exports: [MainNavigationComponent],
})
export class CoreModule {}
