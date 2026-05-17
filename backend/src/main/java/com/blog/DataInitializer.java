package com.blog;

import com.blog.model.AdminUser;
import com.blog.model.Category;
import com.blog.model.ImagePair;
import com.blog.repository.AdminUserRepository;
import com.blog.repository.CategoryRepository;
import com.blog.repository.ImagePairRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final AdminUserRepository adminUserRepository;
    private final CategoryRepository categoryRepository;
    private final ImagePairRepository imagePairRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (categoryRepository.count() == 0) {
            categoryRepository.saveAll(List.of(
                new Category("Technology", "technology", "Articles about software, hardware, and the digital world"),
                new Category("Travel", "travel", "Destinations, tips, and travel stories"),
                new Category("Food", "food", "Recipes, restaurant reviews, and culinary culture"),
                new Category("Lifestyle", "lifestyle", "Health, wellness, and everyday living")
            ));
        }

        if (imagePairRepository.count() == 0) {
            imagePairRepository.saveAll(List.of(
                new ImagePair(
                    "https://picsum.photos/seed/pair1a/400/400",
                    "https://picsum.photos/seed/pair1b/400/400",
                    "Mountains & Forest", 1
                ),
                new ImagePair(
                    "https://picsum.photos/seed/pair2a/400/400",
                    "https://picsum.photos/seed/pair2b/400/400",
                    "City & Ocean", 2
                ),
                new ImagePair(
                    "https://picsum.photos/seed/pair3a/400/400",
                    "https://picsum.photos/seed/pair3b/400/400",
                    "Architecture & Nature", 3
                ),
                new ImagePair(
                    "https://picsum.photos/seed/pair4a/400/400",
                    "https://picsum.photos/seed/pair4b/400/400",
                    "Dawn & Dusk", 4
                )
            ));
        }
    }
}
