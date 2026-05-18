package com.blog.service;

import com.blog.dto.ArticleRequest;
import com.blog.model.Article;
import com.blog.model.Category;
import com.blog.repository.ArticleRepository;
import com.blog.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final CategoryRepository categoryRepository;

    public List<Article> findAll() {
        return articleRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<Article> findByCategory(Long categoryId) {
        return articleRepository.findByCategoryIdOrderByCreatedAtDesc(categoryId);
    }

    public List<Article> findByType(Integer type) {
        return articleRepository.findByTypeOrderByCreatedAtDesc(type);
    }

    public Article findById(Long id) {
        return articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found: " + id));
    }

    public Article create(ArticleRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found: " + request.getCategoryId()));

        Article article = new Article();
        article.setTitle(request.getTitle());
        article.setContent(request.getContent());
        article.setSummary(request.getSummary());
        article.setCategory(category);
        article.setImageUrl(request.getImageUrl());
        article.setType(request.getType());
        return articleRepository.save(article);
    }

    public Article update(Long id, ArticleRequest request) {
        Article article = findById(id);
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found: " + request.getCategoryId()));

        article.setTitle(request.getTitle());
        article.setContent(request.getContent());
        article.setSummary(request.getSummary());
        article.setCategory(category);
        article.setImageUrl(request.getImageUrl());
        article.setType(request.getType());
        return articleRepository.save(article);
    }

    public void delete(Long id) {
        articleRepository.deleteById(id);
    }
}
