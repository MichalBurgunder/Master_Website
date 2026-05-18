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
    const articleType = this.route.snapshot.data['articleType'];

    this.categoryService.getAll().subscribe(categories => {
      this.category = categories.find(c => c.slug === slug) ?? null;

      this.articleService.getAll(undefined, articleType).subscribe(articles => {
        this.articles = articles;
        this.selectedArticle = articles[0] ?? null;
        this.loading = false;
      });
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
