import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home-page/home-page.component';
import { PlotsComponent } from './admin/plots/plots.component';
import { TestsComponent } from './user/tests/tests.component';
import { TwoColorsComponent } from './user/tests/two-colors/two-colors.component';
import { IshiharaComponent } from './user/tests/ishihara/ishihara.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'plots', component: PlotsComponent },
  { path: 'tests', component: TestsComponent },
  { path: 'two-colors', component: TwoColorsComponent },
  { path: 'ishihara', component: IshiharaComponent },
  { path: 'register', loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
