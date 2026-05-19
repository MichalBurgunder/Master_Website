import { Category } from './category.model';

export interface Article {
  id: number;
  title: string;
  content: string;
  summary: string;
  category: Category;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleRequest {
  title: string;
  content: string;
  summary: string;
  categoryId: number;
  imageUrl: string;
}
