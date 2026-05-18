package com.blog.repository;

import com.blog.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> findByCategoryIdOrderByCreatedAtDesc(Long categoryId);
    List<Article> findAllByOrderByCreatedAtDesc();
    List<Article> findByTypeOrderByCreatedAtDesc(Integer type);
}
