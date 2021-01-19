import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiResponse, ApiService, Branch } from '../services/api.service';
import { LocalUtilService } from '../services/local-util.service';

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
export enum ViewType {
  All = 'All',
  Favourites = 'Favourites',
}
@Component({
  selector: 'app-banks-list',
  templateUrl: './banks-list.component.html',
  styleUrls: ['./banks-list.component.scss'],
  providers: [],
})
export class BanksListComponent {
  model = ViewType.Favourites;

  branches$: Observable<Branch[]>;
  filter = new FormControl('');
  pageSizeCtrl = new FormControl(10);
  city = new FormControl('Mumbai');

  constructor(
    private apiService: ApiService,
    private localUtilService: LocalUtilService
  ) {
    this.refreshBranches();
  }
  page = 1;
  get pageSize() {
    return this.pageSizeCtrl.value;
  }
  collectionSize = 0;

  addToFav(branch: Branch) {
    this.localUtilService.toggleFavourite(branch);
    branch.favourite = !branch.favourite;
    if (this.model == 'Favourites') this.refreshBranches();
  }

  refreshBranches() {
    if (this.model == ViewType.All) {
      this.apiService
        .getBranches(
          this.pageSize * (this.page - 1),
          this.pageSize,
          this.city.value
        )
        .toPromise()
        .then((val) => {
          this.collectionSize = val.count;
          this.setBranches(val);
        });
    } else {
      const favBranches = this.localUtilService.getFavouritesList();
      console.log(favBranches);
      this.setBranches({
        count: favBranches.length,
        next: null,
        previous: null,
        results: favBranches,
      } as ApiResponse<Branch>);
    }
  }

  private setBranches(val: ApiResponse<Branch>) {
    this.branches$ = this.filter.valueChanges.pipe(
      startWith(''),
      map((text) =>
        searchBranches(
          val.results.map((res) => {
            console.log(res);
            res.favourite = this.localUtilService
              .getFavouritesList()
              .map((v) => v.ifsc)
              .includes(res.ifsc);
            return res;
          }),
          text
        )
      )
    );
  }
}
