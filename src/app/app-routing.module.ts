import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SolarComponent } from './components/solar/solar.component';
import { LearnMoreComponent } from './components/learn-more/learn-more.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HomeComponent } from './components/home/home.component';
import { NewWindowComponent } from './components/chat-window/new-window/new-window.component';

const routes: Routes = [
  // { path: '', component: DashboardComponent},
  { path: '', component: HomeComponent},
  // { path: 'solar', component: SolarComponent},
  // { path: 'about-us', component: AboutUsComponent},
  // { path: 'why-solar', component: LearnMoreComponent},
  { path: 'new-window', component: NewWindowComponent },
  { path: ':id', component: HomeComponent},
  // { path: ':LinkName', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
