import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BanksListComponent } from './banks-list/banks-list.component';

const routes: Routes = [{ path: '', component: BanksListComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
