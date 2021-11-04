import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ResponseInterceptor } from "./response.interceptor";
import { StorageService } from "./storage.service";


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
  ],
  providers: [
    StorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    }
  ]
})
export class BackendMockModule {}
