import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService, Branch } from '../services/api.service';

function searchBranches(data: Branch[], text: string): Branch[] {
  return data.filter((country) => {
    const term = text.toLowerCase();
    return (
      country.bank.toLowerCase().includes(term) ||
      country.address.toLowerCase().includes(term) ||
      country.branch.toLowerCase().includes(term) ||
      country.city.toLowerCase().includes(term) ||
      country.district.toLowerCase().includes(term) ||
      country.ifsc.toLowerCase().includes(term) ||
      country.state.toLowerCase().includes(term)
    );
  });
}
@Component({
  selector: 'app-banks-list',
  templateUrl: './banks-list.component.html',
  styleUrls: ['./banks-list.component.scss'],
  providers: [],
})
export class BanksListComponent {
  countries$: Observable<Branch[]>;
  filter = new FormControl('');
  pageSizeCtrl = new FormControl(10);
  city = new FormControl('Mumbai');
  constructor(private apiService: ApiService) {
    this.refreshBranches();
  }
  page = 1;
  get pageSize() {
    return this.pageSizeCtrl.value;
  }
  collectionSize = 0;

  refreshBranches() {
    this.apiService
      .getBranches(
        this.pageSize * (this.page - 1),
        this.pageSize,
        this.city.value
      )
      .toPromise()
      .then((val) => {
        this.collectionSize = val.count;
        this.countries$ = this.filter.valueChanges.pipe(
          startWith(''),
          map((text) => searchBranches(val.results, text))
        );
      });
  }
}
