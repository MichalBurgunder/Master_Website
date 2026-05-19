import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from '../../models/article.model';
import { Category } from '../../models/category.model';
import { ArticleService } from '../../services/article.service';
import { CategoryService } from '../../services/category.service';

@Component({
  standalone: false,
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  articles: Article[] = [];
  categories: Category[] = [];
  selectedCategoryId: number | null = null;
  loading = true;

  constructor(
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(cats => {
      this.categories = cats;
    });
    this.loadArticles();
  }

  loadArticles(): void {
    this.loading = true;
    this.articleService.getAll(this.selectedCategoryId ?? undefined).subscribe({
      next: articles => {
        this.articles = articles;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => { this.loading = false; }
    });
  }

  selectCategory(id: number | null): void {
    this.selectedCategoryId = id;
    this.loadArticles();
  }

  openArticle(id: number): void {
    this.router.navigate(['/articles', id]);
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  }
}
