import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ArtistsComponent } from './artists/artists.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';
const routes: Routes = [
  { path: 'artists', component: ArtistsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: ArtistDetailComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({

  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
