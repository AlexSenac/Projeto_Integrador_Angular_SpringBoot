package com.skateClub.skateClub.dto.mapper;

import org.springframework.stereotype.Component;

import com.skateClub.skateClub.dto.FuncionarioDTO;
import com.skateClub.skateClub.model.funcionario;

@Component
public class FuncionarioMapper {

    public FuncionarioDTO toDTO(funcionario funcionario) {
        if (funcionario == null) {
            return null;
        }
        return new FuncionarioDTO(funcionario.getId(), funcionario.getName(), funcionario.getEmail(),
                funcionario.getCpf(), funcionario.getPhone(), funcionario.getSituacao());
    }

    public funcionario toEntity(FuncionarioDTO funcionarioDTO) {

        if (funcionarioDTO == null) {
            return null;
        }

        funcionario funcionario = new funcionario();
        if (funcionarioDTO.id() != null) {
            funcionario.setId(funcionarioDTO.id());
        }
        funcionario.setName(funcionarioDTO.name());
        funcionario.setEmail(funcionarioDTO.email());
        funcionario.setCpf(funcionarioDTO.cpf());
        funcionario.setPhone(funcionarioDTO.phone());
        funcionario.setSituacao(funcionarioDTO.situacao());
        funcionario.setStatus("Ativo");
        return funcionario;
    }

}
