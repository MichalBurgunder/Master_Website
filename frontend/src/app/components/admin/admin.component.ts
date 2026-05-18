import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Article, ArticleRequest } from '../../models/article.model';
import { Category } from '../../models/category.model';
import { ImagePair, ImagePairRequest } from '../../models/image-pair.model';
import { ArticleService } from '../../services/article.service';
import { CategoryService } from '../../services/category.service';
import { ImagePairService } from '../../services/image-pair.service';

type AdminTab = 'articles' | 'gallery';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  activeTab: AdminTab = 'articles';
  categories: Category[] = [];
  articles: Article[] = [];
  imagePairs: ImagePair[] = [];

  articleForm: FormGroup;
  pairForm: FormGroup;

  articleSuccess = '';
  articleError = '';
  pairSuccess = '';
  pairError = '';
  submittingArticle = false;
  submittingPair = false;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private imagePairService: ImagePairService
  ) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      summary: [''],
      content: ['', Validators.required],
      categoryId: ['', Validators.required],
      imageUrl: [''],
      type: ['', Validators.required]
    });

    this.pairForm = this.fb.group({
      image1Url: ['', Validators.required],
      image2Url: ['', Validators.required],
      caption: [''],
      displayOrder: [0]
    });
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(cats => { this.categories = cats; });
    this.loadArticles();
    this.loadPairs();
  }

  loadArticles(): void {
    this.articleService.getAll().subscribe(articles => { this.articles = articles; });
  }

  loadPairs(): void {
    this.imagePairService.getAll().subscribe(pairs => { this.imagePairs = pairs; });
  }

  submitArticle(): void {
    if (this.articleForm.invalid) return;
    this.submittingArticle = true;
    this.articleError = '';
    this.articleSuccess = '';

    const req: ArticleRequest = {
      ...this.articleForm.value,
      categoryId: Number(this.articleForm.value.categoryId)
    };

    this.articleService.create(req).subscribe({
      next: () => {
        this.articleSuccess = 'Article created successfully!';
        this.articleForm.reset();
        this.loadArticles();
        this.submittingArticle = false;
      },
      error: () => {
        this.articleError = 'Failed to create article.';
        this.submittingArticle = false;
      }
    });
  }

  deleteArticle(id: number): void {
    if (!confirm('Delete this article?')) return;
    this.articleService.delete(id).subscribe(() => this.loadArticles());
  }

  submitPair(): void {
    if (this.pairForm.invalid) return;
    this.submittingPair = true;
    this.pairError = '';
    this.pairSuccess = '';

    const req: ImagePairRequest = this.pairForm.value;
    this.imagePairService.create(req).subscribe({
      next: () => {
        this.pairSuccess = 'Image pair added!';
        this.pairForm.reset({ displayOrder: 0 });
        this.loadPairs();
        this.submittingPair = false;
      },
      error: () => {
        this.pairError = 'Failed to add image pair.';
        this.submittingPair = false;
      }
    });
  }

  deletePair(id: number): void {
    if (!confirm('Delete this image pair?')) return;
    this.imagePairService.delete(id).subscribe(() => this.loadPairs());
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  }
}
