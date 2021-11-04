import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
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
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    SharedModule,
  ],
  providers: [
    AuthenticationService,
    UserValidators,
  ]
})
export class AuthModule {}
