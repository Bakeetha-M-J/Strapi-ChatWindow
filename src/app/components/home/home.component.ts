import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MainpageService } from 'src/app/service/mainpage.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homePageContents:any;
  cardContents: any;
  // homePageContents: Observable<any>;
  // homePageStore: SimpleStore<any>;
  constructor(private mainPageData: MainpageService, private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef) {
    // this.homePageContents = new Observable<any>();
  }
  img: any;
  blog: any;
  dataList: any[] = [];
  baseURL: any;
  flag: boolean = false;
  pageId: any;
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.pageId = params['id'] ? params['id'] : 1;
      // console.log('dashboard: ', this.pageId, params);
      // this.mainPageData.getTopBanner(this.pageId).subscribe((data: any) => {
      //   console.log('page data: ', data);
      // });
      this.getTopBanner();
    });


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
    this.mainPageData.getTopBanner(this.pageId).subscribe((response: any) => {
      console.log('response home: ', response);
      if (response) {
        const contentLen = response.attributes?.Contents?.length;
        console.log('Content length: ', contentLen, response.attributes.Contents);
        if (contentLen > 1) {
          this.flag = true;
          this.homePageContents = [];
          this.homePageContents = response.attributes.Contents;
          // if(response.attributes.Contents[contentLen]?.Cards){
            this.cardContents = [];
            this.cardContents = response.attributes.Contents;
          // }
          // this.myProp(response.attributes.Contents);
        } else {
          // this.myProp(response.attributes.Contents[0].Contents);
          this.homePageContents = [];
          // debugger
          this.homePageContents = response.attributes.Contents[0]?.Contents;
          // if(response.attributes.Contents[0]?.Cards){
            // console.log('cardContents len', response.attributes.Contents[0]?.Cards);
            // debugger
            this.cardContents = [];
            this.cardContents = response.attributes.Contents[0]?.Cards;
          // }
        }

        this.blog = response;
        this.baseURL = `${environment.strapiUrl}`;
        // this.changeDetectorRef.detectChanges();
        // window.location.reload();
      }
    }, (error) => {
      console.error('Error occurred:', error);
    });
  }
}


