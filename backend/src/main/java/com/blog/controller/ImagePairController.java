package com.blog.controller;

import com.blog.dto.ImagePairRequest;
import com.blog.model.ImagePair;
import com.blog.service.ImagePairService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/image-pairs")
@RequiredArgsConstructor
public class ImagePairController {

    private final ImagePairService imagePairService;

    @GetMapping
    public ResponseEntity<List<ImagePair>> getAll() {
        return ResponseEntity.ok(imagePairService.findAll());
    }

    @PostMapping
    public ResponseEntity<ImagePair> create(@Valid @RequestBody ImagePairRequest request) {
        return ResponseEntity.ok(imagePairService.create(request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        imagePairService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
