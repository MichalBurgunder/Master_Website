import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../../models/article.model';
import { ArticleService } from '../../services/article.service';

@Component({
  standalone: false,
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  article: Article | null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.articleService.getById(id).subscribe({
      next: article => {
        this.article = article;
        this.loading = false;
      },
      error: () => {
        this.error = 'Article not found.';
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  }
}
