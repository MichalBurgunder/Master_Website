package com.blog.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImagePairRequest {

    @NotBlank
    private String image1Url;

    @NotBlank
    private String image2Url;

    private String caption;

    private Integer displayOrder;
}
