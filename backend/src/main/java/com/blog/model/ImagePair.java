package com.blog.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "image_pairs")
@Getter
@Setter
@NoArgsConstructor
public class ImagePair {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String image1Url;

    @Column(nullable = false)
    private String image2Url;

    private String caption;

    @Column(nullable = false)
    private Integer displayOrder;

    public ImagePair(String image1Url, String image2Url, String caption, Integer displayOrder) {
        this.image1Url = image1Url;
        this.image2Url = image2Url;
        this.caption = caption;
        this.displayOrder = displayOrder;
    }
}
