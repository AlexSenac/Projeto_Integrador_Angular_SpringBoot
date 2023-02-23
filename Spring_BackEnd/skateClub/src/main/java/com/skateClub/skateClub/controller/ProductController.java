package com.skateClub.skateClub.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import com.skateClub.skateClub.model.Product;
import com.skateClub.skateClub.repository.ProductRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;

@Validated
@RestController
@RequestMapping("/api/products")
@AllArgsConstructor
public class ProductController {

    private final ProductRepository productRepository;

    @GetMapping
    public @ResponseBody List<Product> list() {

        return productRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> findById(@PathVariable @NotNull @Positive Long id) {
        return productRepository.findById(id)
                .map(recordFound -> ResponseEntity.ok().body(recordFound))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Product create(@RequestBody @Valid Product product) {
        return productRepository.save(product);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> update(@PathVariable @NotNull @Positive Long id,
            @RequestBody @Valid Product product) {
        return productRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setName(product.getName());
                    recordFound.setAmount(product.getAmount());
                    recordFound.setPurchasePrice(product.getPurchasePrice());
                    recordFound.setPercentage(product.getPercentage());
                    recordFound.setSaleValue(product.getSaleValue());
                    recordFound.setCategory(product.getCategory());
                    recordFound.setSupplier(product.getSupplier());
                    recordFound.setCorporateName(product.getCorporateName());
                    recordFound.setCnpj(product.getCnpj());
                    recordFound.setPhone(product.getPhone());
                    Product updated = productRepository.save(recordFound);
                    return ResponseEntity.ok().body(updated);

                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable @NotNull @Positive Long id) {
        return productRepository.findById(id)
                .map(recordFound -> {
                    productRepository.deleteById(id);
                    return ResponseEntity.noContent().<Void>build();

                })
                .orElse(ResponseEntity.notFound().build());
    }
}
