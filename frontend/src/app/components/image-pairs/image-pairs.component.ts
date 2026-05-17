import { Component, OnDestroy, OnInit } from '@angular/core';
import { ImagePair } from '../../models/image-pair.model';
import { ImagePairService } from '../../services/image-pair.service';

@Component({
  selector: 'app-image-pairs',
  templateUrl: './image-pairs.component.html',
  styleUrls: ['./image-pairs.component.css']
})
export class ImagePairsComponent implements OnInit, OnDestroy {
  pairs: ImagePair[] = [];
  currentIndex = 0;
  private intervalId: ReturnType<typeof setInterval> | null = null;

  constructor(private imagePairService: ImagePairService) {}

  ngOnInit(): void {
    this.imagePairService.getAll().subscribe({
      next: pairs => {
        this.pairs = pairs;
        if (pairs.length > 1) {
          this.startAutoPlay();
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  goTo(index: number): void {
    this.currentIndex = index;
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  prev(): void {
    this.currentIndex = (this.currentIndex - 1 + this.pairs.length) % this.pairs.length;
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.pairs.length;
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  private startAutoPlay(): void {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.pairs.length;
    }, 4000);
  }

  private stopAutoPlay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
