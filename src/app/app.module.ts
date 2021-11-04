import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { BackendMockModule } from './backend-mock/backend-mock.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
