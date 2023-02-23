package com.skateClub.skateClub.model;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
@Table(name = "product")
public class Product {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("_id")
    private Long id;

    @Length(min = 3, max = 100)
    @NotBlank
    @NotNull
    @Column(length = 200, nullable = false)
    private String name;

    @Column(length = 20, nullable = false)
    private int amount;

    @Column(length = 20, nullable = false)
    private int purchasePrice;

    @Column(length = 20, nullable = false)
    private int percentage;

    @Column(length = 20, nullable = false)
    private int saleValue;

    @Column(length = 20, nullable = false)
    private String category;

    @Column(length = 200, nullable = false)
    private String supplier;

    @Column(length = 100, nullable = false)
    private String corporateName;

    @Column(length = 100, nullable = false)
    private String cnpj;

    @Column(length = 100, nullable = false) 
    private String phone;
    
}