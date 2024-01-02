import { Component } from '@angular/core';
import { slideAnimation } from 'src/app/utils/slide.animation';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
  animations: [slideAnimation]
})
export class TestimonialsComponent {
  currentIndex = 0;
  slides = [
    { title: 'Card 1', description: 'Description for Card 1', imageUrl: 'https://picsum.photos/id/700/900/500'},
    {title: 'Card 2', description: 'Description for Card 2', imageUrl: 'https://picsum.photos/id/1011/900/500'},
    {title: 'Card 3', description: 'Description for Card 3', imageUrl: 'https://picsum.photos/id/984/900/500'},
  ];


  constructor() {
    this.preloadImages();
  }

  preloadImages() {
    this.slides.forEach(slide => {
      (new Image()).src = slide.imageUrl;
    });
    console.log('slides: ', this.slides)
  }

  setCurrentSlideIndex(index:number) {
    this.currentIndex = index;
  }

  isCurrentSlideIndex(index:number) {
    return this.currentIndex === index;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex < this.slides.length - 1) ? ++this.currentIndex : 0;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex > 0) ? --this.currentIndex : this.slides.length - 1;
  }
}
