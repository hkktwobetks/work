package com.example.backend.product;

import com.example.backend.product.Product;
import com.example.backend.product.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // 商品一覧取得
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // 商品ID指定で取得
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    // 商品登録
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    // 商品更新
    public Product updateProduct(Long id, Product updatedProduct) {
        Product existing = productRepository.findById(id).orElseThrow();
        existing.setName(updatedProduct.getName());
        existing.setDescription(updatedProduct.getDescription());
        existing.setPrice(updatedProduct.getPrice());
        existing.setStock(updatedProduct.getStock());
        return productRepository.save(existing);
    }

    // 商品削除
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
