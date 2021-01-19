import { Injectable } from '@angular/core';
import { Branch } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class LocalUtilService {
  FAVOURITES_BRANCHES_KEY = 'FAVOURITES_BRANCHES';

  getFavouritesList(): Branch[] {
    return JSON.parse(localStorage.getItem(this.FAVOURITES_BRANCHES_KEY)) ?? [];
  }

  toggleFavourite(branch: Branch) {
    let oldValue = this.getFavouritesList();
    const exists = oldValue.filter((ov) => ov.ifsc == branch.ifsc).length > 0;
    if (exists) oldValue = oldValue.filter((ov) => ov.ifsc != branch.ifsc);
    else oldValue.push(branch);

    localStorage.setItem(
      this.FAVOURITES_BRANCHES_KEY,
      JSON.stringify(oldValue)
    );
  }

  constructor() {}
}
