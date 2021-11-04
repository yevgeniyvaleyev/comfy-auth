import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { APP_CONFIG } from './config/tokens';
import { APP_CONFIG_DATA } from './config/config';
import { SharedModule } from './shared/shared.module';
import { BackendMockModule } from './backend-mock/backend-mock.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    BackendMockModule,
  ],
  providers: [
    { provide: APP_CONFIG, useValue: APP_CONFIG_DATA },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
