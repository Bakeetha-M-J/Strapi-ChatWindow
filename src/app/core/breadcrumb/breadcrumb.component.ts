import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  constructor(private data: DataService, private activatedRoute: ActivatedRoute){}
  ngOnInit(): void {
// console.log('activeRoute', );
this.activatedRoute.paramMap.subscribe((params)=>{
// console.log('params', params);
})
  }

}
