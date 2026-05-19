import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../models/article.model';
import { ArticleService } from '../../services/article.service';

@Component({
  standalone: false,
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {
  articles: Article[] = [];
  selectedArticle: Article | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const categoryId = this.route.snapshot.data['categoryId'];

    this.articleService.getAll(categoryId).subscribe(articles => {
      this.articles = articles;
      this.selectedArticle = articles[0] ?? null;
      this.loading = false;
      this.cdr.detectChanges();
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
