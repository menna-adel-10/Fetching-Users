import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' }, // Redirect to userList page by default
  { path: '', component: HomeComponent },
  { path: 'user-detail/:id', component: UserDetailComponent } // Route with parameter for userDetail page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
