import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ImagePair } from '../../models/image-pair.model';
import { ImagePairService } from '../../services/image-pair.service';

@Component({
  standalone: false,
  selector: 'app-squares',
  templateUrl: './squares.component.html',
  styleUrls: ['./squares.component.css']
})
export class SquaresComponent implements OnInit {
  pairs: ImagePair[] = [];
  selectedPair: ImagePair | null = null;
  loading = true;

  constructor(private imagePairService: ImagePairService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.imagePairService.getAll().subscribe(pairs => {
      this.pairs = pairs;
      this.selectedPair = pairs[0] ?? null;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  select(pair: ImagePair): void {
    this.selectedPair = pair;
  }
}
