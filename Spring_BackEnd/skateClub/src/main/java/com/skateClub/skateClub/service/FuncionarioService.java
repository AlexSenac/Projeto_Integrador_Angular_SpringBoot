package com.skateClub.skateClub.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;

import com.skateClub.skateClub.dto.FuncionarioDTO;
import com.skateClub.skateClub.dto.mapper.FuncionarioMapper;
import com.skateClub.skateClub.exception.RecordNotFoundException;
import com.skateClub.skateClub.repository.FuncionarioRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class FuncionarioService {

    private final FuncionarioRepository funcionarioRepository;
    private final FuncionarioMapper funcionarioMapper;

    public FuncionarioService(FuncionarioRepository funcionarioRepository, FuncionarioMapper funcionarioMapper) {
        this.funcionarioRepository = funcionarioRepository;
        this.funcionarioMapper = funcionarioMapper;
    }

    public List<FuncionarioDTO> list() {
        return funcionarioRepository.findAll()
                .stream()
                .map(funcionarioMapper::toDTO)
                .collect(Collectors.toList());
    }

    public FuncionarioDTO findById(@PathVariable @NotNull @Positive Long id) {
        return funcionarioRepository.findById(id).map(funcionarioMapper::toDTO)
                .orElseThrow(() -> new RecordNotFoundException(id));
    }

    public FuncionarioDTO create(@Valid @NotNull FuncionarioDTO funcionario) {
        return funcionarioMapper.toDTO(funcionarioRepository.save(funcionarioMapper.toEntity(funcionario)));
    }

    public FuncionarioDTO update(@NotNull @Positive Long id,
            @Valid FuncionarioDTO funcionario) {
        return funcionarioRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setName(funcionario.name());
                    recordFound.setEmail(funcionario.email());
                    recordFound.setCpf(funcionario.cpf());
                    recordFound.setPhone(funcionario.phone());
                    recordFound.setSituacao(funcionario.situacao());
                    return funcionarioMapper.toDTO(funcionarioRepository.save(recordFound));
                }).orElseThrow(() -> new RecordNotFoundException(id));
    }

    public void delete(@PathVariable @NotNull @Positive Long id) {

        funcionarioRepository
                .delete(funcionarioRepository.findById(id).orElseThrow(() -> new RecordNotFoundException(id)));

    }

}
