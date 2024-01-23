import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './core/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BreadcrumbComponent } from './core/breadcrumb/breadcrumb.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';

import { SolarComponent } from './components/solar/solar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { LearnMoreComponent } from './components/learn-more/learn-more.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './core/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';

// IMPORT STAR RATING MODULE
import { StarRatingModule } from 'angular-star-rating';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewWindowComponent } from './components/chat-window/new-window/new-window.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    BreadcrumbComponent,
    SolarComponent,
    AboutUsComponent,
    LearnMoreComponent,
    HomeComponent,
    FooterComponent,
    TestimonialsComponent,
    ChatWindowComponent,
    NewWindowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    MatGridListModule,
    MatCardModule,
    NgbModule,
    ReactiveFormsModule,
    StarRatingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
