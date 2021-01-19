import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { BanksListComponent } from './banks-list/banks-list.component';

const routes: Routes = [
  { path: 'banks', component: BanksListComponent },
  { path: 'banks/:id', component: BankDetailsComponent },
  { path: '**', redirectTo: 'banks' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
