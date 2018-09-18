import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { routing } from 'src/app/app.routing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalComponent } from './shared/components/modal/modal.component';
import { ResponseInterceptorService } from 'src/app/shared/services/response-interceptor.service';
import { Ng2Webstorage } from 'ngx-webstorage';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routing,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
      closeButton: true
    }),
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    Ng2Webstorage
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptorService, multi: true }
  ],
  entryComponents: [
    ModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
