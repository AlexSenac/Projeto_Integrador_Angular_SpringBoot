package com.skateClub.skateClub.dto;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record FuncionarioDTO(
        @JsonProperty("_id") Long id,
        @NotBlank @NotNull @Length(min = 3, max = 100) String name,
        @NotNull String email,
        @NotNull String cpf,
        @NotNull String phone,
        @NotNull @Length(max = 10) @Pattern(regexp = "Ativo|Inativo") String situacao) {

}
