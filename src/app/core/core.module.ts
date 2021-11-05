import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainNavigationComponent } from './main-navigation.component';
import { SharedModule } from '../shared/shared.module';
import { APP_CONFIG } from './config';
import { APP_CONFIG_DATA } from './config';

@NgModule({
  declarations: [MainNavigationComponent],
  imports: [RouterModule, SharedModule],
  exports: [MainNavigationComponent],
  providers: [{ provide: APP_CONFIG, useValue: APP_CONFIG_DATA }],
})
export class CoreModule {}
