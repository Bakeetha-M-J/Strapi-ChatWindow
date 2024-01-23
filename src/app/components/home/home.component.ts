import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MainpageService } from 'src/app/service/mainpage.service';
import { environment } from 'src/environments/environment.development';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { trigger, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig],
  animations: [
    trigger('fade', [
      transition('void => *', [style({ opacity: 0 }), animate('500ms', style({ opacity: 1 }))]),
      transition('* => void', [style({ opacity: 1 }), animate('500ms', style({ opacity: 0 }))]),
    ])
  ]
})
export class HomeComponent implements OnInit {
  homePageContents: any;
  cardContents: any;
  constructor(private mainPageData: MainpageService,
    private route: ActivatedRoute, private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    config: NgbCarouselConfig) {
    config.interval = 2000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }
  img: any;
  blog: any;
  dataList: any[] = [];
  baseURL: any;
  flag: boolean = false;
  pageId: any;
  pageUrl:any;
  current = 0;
  reviewCardContents: any;
  bannerContent: any;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
        // console.log('page data: ', params);
      this.pageUrl = params['id'] ? params['id'] : 'home';
      // this.mainPageData.getTopBanner(this.pageId).subscribe((data: any) => {
        // });
        this.pageId = localStorage.getItem('pageId');
        // console.log('dashboard pageId: ', this.pageId, this.pageUrl);
      this.getTopBanner();

    });
    this.displayedItems = this.items.slice(0, 3); // Initially display the first three items
    setInterval(() => {
      this.current = ++this.current % this.items.length;
    }, 5000);

    // localStorage.removeItem('pageId');
  }

  getTopBanner(): void {
    // debugger
    // console.log('hhhhh', this.pageId);
    this.mainPageData.getTopBanner(this.pageId?this.pageId:1).subscribe((response: any) => {
      console.log('response page: ', this.pageId, response);
      if (response) {
        this.bannerContent = response.attributes?.Banner;
        // console.log('bannercontent: ', this.bannerContent);
        const contentLen = response.attributes?.Contents?.length;
        // console.log('Content length: ', contentLen, response.attributes.Contents);
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
        this.router.navigateByUrl(response.attributes.slug ? response.attributes.slug : this.pageUrl);
      }
    }, (error) => {
      console.error('Error occurred:', error);
    });
  }

  images = [
    { title: 'First Slide', short: 'First Slide Short', src: "https://picsum.photos/id/700/900/500" },
    { title: 'Second Slide', short: 'Second Slide Short', src: "https://picsum.photos/id/1011/900/500" },
    { title: 'Third Slide', short: 'Third Slide Short', src: "https://picsum.photos/id/984/900/500" }
  ];

  @ViewChild('cardDeck') cardDeck!: ElementRef<HTMLDivElement>;
  displayedItems: any[] = [];

  items = [
    { title: 'Card 1', rating: 5, description: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book', imageUrl: 'https://picsum.photos/id/700/900/500' },
    { title: 'Card 2', rating: 2.5, description: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', imageUrl: 'https://picsum.photos/id/1011/900/500' },
    { title: 'Card 3', rating: 3, description: 'Description for Card 3', imageUrl: 'https://picsum.photos/id/984/900/500' },
    { title: 'Card 4', rating: 4.63, description: 'Description for Card 4', imageUrl: 'https://picsum.photos/id/700/900/500' },
    { title: 'Card 5', rating: 3.63, description: 'Description for Card 5', imageUrl: 'https://picsum.photos/id/1011/900/500' },
    { title: 'Card 6', rating: 2.63, description: 'Description for Card 6', imageUrl: 'https://picsum.photos/id/984/900/500' },
    // Add more items as needed
  ];

  slide(direction: number) {
    const cardsToShow = 3; // Number of cards to show at a time
    const currentOffset = this.displayedItems.length;
    // Calculate the total number of cards displayed
    const totalDisplayedCards = Math.min(currentOffset, cardsToShow);
    // Calculate the maximum offset based on the number of items
    const maxOffset = this.items.length - cardsToShow;
    let newOffset = currentOffset + direction * cardsToShow;
    // Handle bounds when sliding left
    if (direction === -1 && totalDisplayedCards === cardsToShow) {
      newOffset = 0; // Reset to the beginning
    }
    // Handle bounds when sliding right
    if (direction === 1 && newOffset > maxOffset) {
      newOffset = maxOffset; // Reset to the maximum offset
    }
    this.displayedItems = this.items.slice(newOffset, newOffset + cardsToShow);
    if (this.cardDeck) {
      this.cardDeck.nativeElement.scrollLeft = 0; // Reset scroll position when sliding
    }
  }

}


