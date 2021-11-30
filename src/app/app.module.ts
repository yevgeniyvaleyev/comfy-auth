import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BackendMockModule } from './backend-mock/backend-mock.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import * as fromApp from './store/app.reducer';
import { SignUpEffects } from './auth/store/auth.effects';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedModule,
    HttpClientModule,
    CoreModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    EffectsModule.forRoot([SignUpEffects]),
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot(fromApp.appReducer),
    BrowserAnimationsModule,
    BackendMockModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
