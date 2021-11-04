import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: DashboardComponent }]),
  ],
})
export class DashboardModule {}
