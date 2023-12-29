import { Component } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { MainpageService } from 'src/app/service/mainpage.service';

export interface headerElements {
title: string;
}
const header_Data: headerElements[] = [
 { title: 'Solar'},
 { title: 'Roofing'},
 { title: 'Batteries'},
 { title: 'Why Trinity'},
 { title: 'Community Partners'},
 { title: 'Careers'},
];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  pages: any;
  logo:any;
  constructor(private data: DataService,
    private mainPageData: MainpageService) {

  }
  ngOnInit(): void {
    this.getNavBar();
    this.getPages();
  }

  getNavBar(): void {
    this.mainPageData.getNavbar().subscribe((response: any) => {
      if (response) {
        // this.pages = response.attributes.HeaderMenus.HeaderLinks;
        // this.blogs = response; data[0].attributes.Navbar
        // console.log('Received this.pages:', this.pages);
      }
    }, (error) => {
      console.error('Error occurred:', error);
    });
  }


  getPages(){
      this.mainPageData.getHeaders().subscribe((response: any) => {
        if (response) {
          // console.log('Received this.pages:', response);
          this.pages = response;
          // this.blogs = response; data[0].attributes.Navbar
        }
      }, (error) => {
        console.error('Error occurred:', error);
      });
  }




// getLogo()
  // getLogo(){
  //   this.data.getLogo().subscribe(
  //     (data) => {
  //       this.logo = data;
  //       console.log('Received getLogo():', this.logo);
  //       // Do something with the data here
  //     },
  //     (error) => {
  //       console.error('Error occurred:', error);
  //       // Handle errors here
  //     }
  //   );
  // }


}
