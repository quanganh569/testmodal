import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeComponent } from './components/employee/employee.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';


//import Library ANT-DESIGN
import { NzTableModule } from 'ng-zorro-antd/table';


//import Library ngx-Bootstrap
import { ModalModule } from 'ngx-bootstrap/modal';
import {NgxPaginationModule} from 'ngx-pagination';
//import Library ng2
import { Ng2SearchPipeModule } from 'ng2-search-filter';

//import library ngxToastr
import { ToastrModule } from 'ngx-toastr';



registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    NzTableModule,
    Ng2SearchPipeModule,
    ModalModule.forRoot(),
    NgxPaginationModule,
    ToastrModule.forRoot(), // ToastrModule added,
    ReactiveFormsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
