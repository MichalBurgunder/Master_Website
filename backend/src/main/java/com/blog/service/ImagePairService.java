package com.blog.service;

import com.blog.dto.ImagePairRequest;
import com.blog.model.ImagePair;
import com.blog.repository.ImagePairRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ImagePairService {

    private final ImagePairRepository imagePairRepository;

    public List<ImagePair> findAll() {
        return imagePairRepository.findAllByOrderByDisplayOrderAsc();
    }

    public ImagePair create(ImagePairRequest request) {
        ImagePair pair = new ImagePair();
        pair.setImage1Url(request.getImage1Url());
        pair.setImage2Url(request.getImage2Url());
        pair.setCaption(request.getCaption());
        pair.setDisplayOrder(request.getDisplayOrder() != null ? request.getDisplayOrder() : 0);
        return imagePairRepository.save(pair);
    }

    public void delete(Long id) {
        imagePairRepository.deleteById(id);
    }
}
