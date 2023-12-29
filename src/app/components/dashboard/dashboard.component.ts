import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/service/data.service';
import { MainpageService } from 'src/app/service/mainpage.service';
import { Products } from 'src/app/utils/dashboard-interface';
import { environment } from 'src/environments/environment';
export interface dashboardElement {
  heading: string;
  contents: any;
}

const dashboard_DATA: dashboardElement[] = [
  { heading: 'Lorem ipsum dolor sit amet', contents: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
  { heading: 'Lorem ipsum dolor sit amet', contents: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
  { heading: 'Lorem ipsum dolor sit amet', contents: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
];
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pageData: any;

  constructor(private route: ActivatedRoute, private dataService: MainpageService) { }

  ngOnInit(): void {
    // this.route.params.subscribe(params => {
    //   const id = params['id']; // Get the 'id' parameter from the route (/pages/:id)
    //   console.log('dashboard: ', id, params);
    //   this.dataService.getPageData(id).subscribe((data: any) => {
    //     this.pageData = data; // Fetch data based on the 'id'

    //   });
    // });
  }

}
