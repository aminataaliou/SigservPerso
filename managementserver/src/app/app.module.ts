import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER } from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {InterceptorAdminInterceptor} from "./shareds/interceptors/interceptor-admin.interceptor";
import {ErrorHandlerInterceptor} from "./shareds/interceptors/error-handler.interceptor";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      BrowserAnimationsModule,
      TuiRootModule,
      TuiDialogModule,
      TuiAlertModule,
    HttpClientModule
],
  providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer},
    { provide: HTTP_INTERCEPTORS,
      useClass: InterceptorAdminInterceptor,
      multi: true},
    { provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true}
      ],
  bootstrap: [AppComponent]
})
export class AppModule { }
