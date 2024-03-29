import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { MainpageService } from 'src/app/service/mainpage.service';

export interface headerElements {
  title: string;
}
const header_Data: headerElements[] = [
  { title: 'Solar' },
  { title: 'Roofing' },
  { title: 'Batteries' },
  { title: 'Why Trinity' },
  { title: 'Community Partners' },
  { title: 'Careers' },
];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  pages: any;
  logo: any;
  isScrolled = false;
  pageId: number | undefined;
  loadedPages: any[] = []; // Assuming this stores the page data fetched from the API


  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Check if the user has scrolled down
    this.isScrolled = window.scrollY > 0;
  }
  constructor(private data: DataService,
    private mainPageData: MainpageService,
    private route: ActivatedRoute, private router: Router) {

  }
  ngOnInit(): void {
    // this.getNavBar();
    this.getPages();
    // this.route.params.subscribe(params => {
    //   const pageName = params['pageName'];
    //   console.log('pageName',pageName);
    //   this.loadPage(pageName);
    //   // alert('hii');
    // });
  }

  getPages() {
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

  passPageId(pageId:any):void {
    // console.log('Passing page id:', pageId);
    localStorage.setItem('pageId', pageId);

  }
  // loadPage(pageName: string) {
  //   const page = this.pages.find((page:any) => {
  //     console.log('Loading page', page);
  //     page.attributes.Href === pageName;
  //   });
  //   if (page) {
  //     this.pageId = page.id;
  //     this.updateUrl(page.attributes.Href);
  //     // Load content based on the page
  //     // For example, fetch data corresponding to the page ID
  //   }
  // }

  // updateUrl(pageHref: string) {
  //   this.router.navigateByUrl(`/${pageHref}`);
  // }

  // getNavBar(): void {
  //   this.mainPageData.getNavbar().subscribe((response: any) => {
  //     if (response) {
  //       // this.pages = response.attributes.HeaderMenus.HeaderLinks;
  //       // this.blogs = response; data[0].attributes.Navbar
  //       // console.log('Received this.pages:', this.pages);
  //     }
  //   }, (error) => {
  //     console.error('Error occurred:', error);
  //   });
  // }



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
