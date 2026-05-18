package com.blog.controller;

import com.blog.dto.ArticleRequest;
import com.blog.model.Article;
import com.blog.service.ArticleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;

    @GetMapping
    public ResponseEntity<List<Article>> getAll(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Integer type) {
        if (type != null) {
            return ResponseEntity.ok(articleService.findByType(type));
        }
        if (categoryId != null) {
            return ResponseEntity.ok(articleService.findByCategory(categoryId));
        }
        return ResponseEntity.ok(articleService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Article> getById(@PathVariable Long id) {
        return ResponseEntity.ok(articleService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Article> create(@Valid @RequestBody ArticleRequest request) {
        return ResponseEntity.ok(articleService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Article> update(@PathVariable Long id,
                                          @Valid @RequestBody ArticleRequest request) {
        return ResponseEntity.ok(articleService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        articleService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
