package com.skateClub.skateClub.model;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
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
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
@Entity
@SQLDelete(sql = "UPDATE funcionario SET status = 'Inativo' WHERE id = ?")
@Where(clause = "status = 'Ativo'")
@Table(name = "funcionario")
public class funcionario {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("_id")
    private Long id;

    @Length(min = 3, max = 100)
    @NotBlank
    @NotNull
    @Column(length = 200, nullable = false)
    private String name;

    @NotNull
    @Column(length = 100, nullable = false)
    private String email;

    @NotNull
    @Column(length = 20, nullable = false)
    private String cpf;

    @NotNull
    @Column(length = 20, nullable = false)
    private String phone;

    @NotNull
    @Column(length = 20, nullable = false)
    private String situacao;

    @NotNull
    @Length(max = 10)
    @Pattern(regexp = "Ativo|Inativo")
    @Column(length = 10, nullable = false)
    private String status = "Ativo";

}
