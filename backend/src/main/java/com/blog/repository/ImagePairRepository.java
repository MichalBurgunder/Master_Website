package com.blog.repository;

import com.blog.model.ImagePair;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImagePairRepository extends JpaRepository<ImagePair, Long> {
    List<ImagePair> findAllByOrderByDisplayOrderAsc();
}
