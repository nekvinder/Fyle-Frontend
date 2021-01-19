import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService, Branch } from '../services/api.service';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss'],
})
export class BankDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private apiService: ApiService) {}
  private sub: Subscription;
  branch: Branch = null;
  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      let ifsc = params['id'];
      this.apiService
        .getBranch(ifsc)
        .toPromise()
        .then((val) => {
          this.branch = val;
        });
    });
  }
}
