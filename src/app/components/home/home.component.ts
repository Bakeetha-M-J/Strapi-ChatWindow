import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  // animations: [
  //   trigger('fade', [
  //     transition('void => *', [style({ opacity: 0 }), animate('500ms', style({ opacity: 1 }))]),
  //     transition('* => void', [style({ opacity: 1 }), animate('500ms', style({ opacity: 0 }))]),
  //   ])
  // ]
})
export class HomeComponent implements OnInit {
  homePageContents:any;
  cardContents: any;
  // homePageContents: Observable<any>;
  // homePageStore: SimpleStore<any>;
  constructor(private mainPageData: MainpageService,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    config: NgbCarouselConfig) {
    // this.homePageContents = new Observable<any>();
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
  current = 0;
  reviewCardContents: any;
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.pageId = params['id'] ? params['id'] : 1;
      console.log('dashboard pageId: ', this.pageId, params);
      // this.mainPageData.getTopBanner(this.pageId).subscribe((data: any) => {
      //   console.log('page data: ', data);
      // });
      this.getTopBanner();
    });

    this.displayedItems = this.items.slice(0, 3); // Initially display the first three items

    // this.reviewCards();

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



  // reviewCards(){
  //   this.reviewCardContents = [
  //     {
  //       name: 'Alexander',
  //       img: `https://material.angular.io/assets/img/examples/shiba2.jpg`,
  //       review: "The Shiba Inu is the smallest of the six original and distinct spitz  breeds of dog from Japan."
  //     },
  //     {
  //       name: 'John De',
  //       img: `https://picsum.photos/600/400/?image=0`,
  //       review: " A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting."
  //     },
  //     {
  //       name: 'Mozes',
  //       img: `https://picsum.photos/600/400/?image=2`,
  //       review: "The Shiba Inu is the smallest of the six original and distinct spitz  breeds of dog from Japan."
  //     },
  //   ];

  //   setInterval(() => {
  //     this.current = ++this.current % this.reviewCardContents.length;
  //   }, 5000);
  // }



  images = [
    {title: 'First Slide', short: 'First Slide Short', src: "https://picsum.photos/id/700/900/500"},
    {title: 'Second Slide', short: 'Second Slide Short', src: "https://picsum.photos/id/1011/900/500"},
    {title: 'Third Slide', short: 'Third Slide Short', src: "https://picsum.photos/id/984/900/500"}
  ];











  @ViewChild('cardDeck') cardDeck!: ElementRef<HTMLDivElement>;
  displayedItems: any[] = [];


  items = [
    { title: 'Card 1', description: 'Description for Card 1', imageUrl: 'https://picsum.photos/id/700/900/500' },
    { title: 'Card 2', description: 'Description for Card 2', imageUrl: 'https://picsum.photos/id/1011/900/500' },
    { title: 'Card 3', description: 'Description for Card 3', imageUrl: 'https://picsum.photos/id/984/900/500' },
    { title: 'Card 4', description: 'Description for Card 4', imageUrl: 'https://picsum.photos/id/700/900/500' },
    { title: 'Card 5', description: 'Description for Card 5', imageUrl: 'https://picsum.photos/id/1011/900/500' },
    { title: 'Card 6', description: 'Description for Card 6', imageUrl: 'https://picsum.photos/id/984/900/500' },
    // Add more items as needed
  ];

  // slide(direction: number) {
  //   const currentIndex = this.items.findIndex((item) => item === this.items[0]);
  //   const lastIndex = this.items.length - 1;

  //   if ((direction === -1 && currentIndex === 0) || (direction === 1 && currentIndex === lastIndex)) {
  //     return; // Prevent sliding beyond the array bounds
  //   }

  //   // Shift the array based on the direction (left or right)
  //   const shiftedItems = this.items.slice();
  //   for (let i = 0; i < Math.abs(direction); i++) {
  //     if (direction === 1) {
  //       shiftedItems.push(shiftedItems.shift() as any);
  //     } else {
  //       shiftedItems.unshift(shiftedItems.pop() as any);
  //     }
  //   }

  //   this.items = shiftedItems;
  // }

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

//   slide(direction: number) {
//     const cardsToShow = 3; // Number of cards to show at a time
//     const currentOffset = this.displayedItems.length;
// console.log('direction',direction, currentOffset,this.items.length);
//     if (direction === -1) {
//       if (currentOffset === 3) {
//         return; // Prevent sliding beyond the first set of cards
//       }
//     } else if (direction === 1) {
//       if (currentOffset + 3 > this.items.length) {
//         return; // Prevent sliding beyond the last set of cards
//       }
//     }

//     const newOffset = currentOffset + direction * cardsToShow;
//     this.displayedItems = this.items.slice(newOffset, newOffset + cardsToShow);

//     if (this.cardDeck) {
//       this.cardDeck.nativeElement.scrollLeft = 0; // Reset scroll position when sliding
//     }
//   }
  // current = 0;
  // prev = -1;

  // onPrev() {
  //   this.prev = this.current--;
  // }

  // onNext() {
  //   this.prev = this.current++ ;
  // }

  // isLeftTransition(idx: number): boolean {
  //   return this.current === idx ? this.prev > this.current : this.prev < this.current;
  // }
}


