import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CashFlowComponent } from './pages/cash-flow/cash-flow.component';
import { CashFlowFormComponent } from './pages/components/cash-flow-form/cash-flow-form.component';
import { CashFlowTableComponent } from './pages/components/cash-flow-table/cash-flow-table.component';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CashFlowComponent,
    CashFlowFormComponent,
    CashFlowTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CurrencyMaskModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
