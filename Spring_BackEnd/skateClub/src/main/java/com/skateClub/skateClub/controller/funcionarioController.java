package com.skateClub.skateClub.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.skateClub.skateClub.dto.FuncionarioDTO;
import com.skateClub.skateClub.service.FuncionarioService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@RestController
@RequestMapping("/api/funcionario")

public class funcionarioController {

    private final FuncionarioService funcionarioService;

    public funcionarioController(FuncionarioService funcionarioService) {

        this.funcionarioService = funcionarioService;
    }

    @GetMapping
    public @ResponseBody List<FuncionarioDTO> list() {
        return funcionarioService.list();
    }

    @GetMapping("/{id}")
    public FuncionarioDTO findById(@PathVariable @NotNull @Positive Long id) {
        return funcionarioService.findById(id);
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public FuncionarioDTO create(@RequestBody @Valid FuncionarioDTO funcionario) {
        return funcionarioService.create(funcionario);
    }

    @PutMapping("/{id}")
    public FuncionarioDTO update(@PathVariable @NotNull @Positive Long id,
            @RequestBody @Valid FuncionarioDTO funcionario) {
        return funcionarioService.update(id, funcionario);

    }

    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void delete(@PathVariable @NotNull @Positive Long id) {
        funcionarioService.delete(id);
    }

}
