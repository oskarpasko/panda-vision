import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home-page/home-page.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { PlotsComponent } from './admin/plots/plots.component';
import { TestsComponent } from './user/tests/tests.component';
import { TwoColorsComponent } from './user/tests/two-colors/two-colors.component';
import { IshiharaComponent } from './user/tests/ishihara/ishihara.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AdminComponent,
    HomeComponent,
    FooterComponent,
    NavComponent,
    PlotsComponent,
    TestsComponent,
    TwoColorsComponent,
    IshiharaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
