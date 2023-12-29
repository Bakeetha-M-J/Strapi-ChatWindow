import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainpageService } from 'src/app/service/mainpage.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  homePageContents:any;
  constructor(private mainPageData: MainpageService, private route: ActivatedRoute,){}
img:any;
blog:any;
dataList: any[] = [];
baseURL:any;
  ngOnInit(): void {

    this.getTopBanner();
    // this.route.params.subscribe(params => {
    //   const id = params['id']; // Get the 'id' parameter from the route
    //   this.mainPageData.getDataById(id).subscribe((data: any) => {
    //     this.dataList = data; // Fetch data based on the 'id'
    //   });
    // });


    // this.getMainPage();
  }
  // getMainPage(): void {
  //   this.mainPageData.getHeaderLinks().subscribe((response: any) => {
  //     if (response) {
  //       this.homePageContents = response;
  //       console.log('Received getHeaderLinks:', this.homePageContents);
  //     }
  //   }, (error) => {
  //     console.error('Error occurred:', error);
  //   });
  // }



  getTopBanner(): void {
    // this.mainPageData.getTopBanner().subscribe((response: any) => {
    //   console.log('response: ', response);
    //   if (response) {
    //     this.homePageContents = response;
    //     this.blog = response;
    //     this.baseURL = `${environment.strapiUrl}`; // Replace with your Strapi server base URL
    //     // const imageURL = `${baseURL}${this.homePageContents}`;
    //     // this.img = `${environment.strapiUrl}`+this.homePageContents[0].attributes.Banner.Image.data.attributes.url
    //     console.log('Received getTopBanner:', this.homePageContents, );
    //   }
    // }, (error) => {
    //   console.error('Error occurred:', error);
    // });
  }
}
