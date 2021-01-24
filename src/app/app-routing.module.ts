import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChefTeamsComponent } from './components/chef-teams/chef-teams.component';
import { ChefWaitingListComponent } from './components/chef-waiting-list/chef-waiting-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  // Our main home page will be the Wating List Page
  { path: '', pathMatch: 'full', redirectTo: '/chef-waiting-list' },
  { path: 'chef-waiting-list', component: ChefWaitingListComponent},
  { path: 'chef-competition-teams', component: ChefTeamsComponent},
  // route all other route combinations to the page not found component
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
