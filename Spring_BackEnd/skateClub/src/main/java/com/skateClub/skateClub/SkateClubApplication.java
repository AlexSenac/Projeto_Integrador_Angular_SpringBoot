package com.skateClub.skateClub;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.skateClub.skateClub.model.Product;

import com.skateClub.skateClub.repository.ProductRepository;

@SpringBootApplication
public class SkateClubApplication {

	public static void main(String[] args) {
		SpringApplication.run(SkateClubApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(ProductRepository productRepository) {
		return args -> {
			productRepository.deleteAll();

			Product p = new Product();
			p.setName("Orange");
			p.setAmount(10);
			p.setPurchasePrice(2);
			p.setPercentage(10);
			p.setSaleValue(6);
			p.setCategory("Fruit");
			p.setSupplier("Hortifruti");
			p.setCorporateName("Hortigil Hortifruti S.A");
			p.setCnpj("31.487.473/0035-38");
			p.setPhone("99532053");

			productRepository.save(p);
		};
	}

}
