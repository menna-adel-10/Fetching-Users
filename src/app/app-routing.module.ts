import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' }, // Redirect to userList page by default
  { path: '', component: UserListComponent },
  { path: 'userDetail/:userId', component: UserDetailComponent } // Route with parameter for userDetail page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
