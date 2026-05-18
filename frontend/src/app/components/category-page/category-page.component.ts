import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../models/article.model';
import { Category } from '../../models/category.model';
import { ArticleService } from '../../services/article.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {
  articles: Article[] = [];
  selectedArticle: Article | null = null;
  category: Category | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.url[0]?.path || '';

    this.categoryService.getAll().subscribe(categories => {
      this.category = categories.find(c => c.slug === slug) ?? null;
      if (this.category) {
        this.articleService.getAll(this.category.id).subscribe(articles => {
          this.articles = articles;
          this.selectedArticle = articles[0] ?? null;
          this.loading = false;
        });
      } else {
        this.loading = false;
      }
    });
  }

  select(article: Article): void {
    this.selectedArticle = article;
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  }
}
