package com.skateClub.skateClub.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skateClub.skateClub.model.Users;
import com.skateClub.skateClub.repository.UsersRepository;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/users")
@AllArgsConstructor
public class UserController {

    private final UsersRepository usersRepository;

    @GetMapping
    public List<Users> list() {
        return usersRepository.findAll();
    }
    
}
