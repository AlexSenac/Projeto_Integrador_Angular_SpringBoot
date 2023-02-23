package com.skateClub.skateClub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skateClub.skateClub.model.Users;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {
    
}
