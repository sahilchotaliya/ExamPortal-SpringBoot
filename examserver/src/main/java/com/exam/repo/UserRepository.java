package com.exam.repo;

import com.exam.model.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User ,Long> {
	public Optional<User> findByUsername(String username);
}
