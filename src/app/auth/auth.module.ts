import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthenticationService } from "./authentication.service";
import { LoginComponent } from "./login.component";
import { SignUpComponent } from "./sign-up.component";
import { UserValidators } from "./validators/user.validator";


@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
  ],
  imports: [
    AuthRoutingModule,
    SharedModule,
  ],
  providers: [
    AuthenticationService,
    UserValidators,
  ]
})
export class AuthModule {}
