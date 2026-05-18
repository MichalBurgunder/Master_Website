package com.blog.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ArticleRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String content;

    private String summary;

    @NotNull
    private Long categoryId;

    private String imageUrl;

    private Integer type;
}
