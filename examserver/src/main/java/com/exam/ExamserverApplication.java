package com.exam;

import com.exam.model.Role;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class ExamserverApplication implements CommandLineRunner {



	public static void main(String[] args) {
		SpringApplication.run(ExamserverApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("Stared Code ");
//
//		User user = new User();
//
//		user.setFirstname("Sahil");
//		user.setLastname("Chotaliya");
//		user.setName("Sahil1212");
//		user.setPassword("Sahil@1212");
//		user.setEmail("Sahil@7990");
//		user.setNumber("7990256225");
//		user.setProfile("default.png");
//
//
//		Role role1 = new Role();
//		role1.setRoleId(44L);
//		role1.setRoleName("ADMIN");
//
//
//
//		Set<UserRole> userRoleSet = new HashSet<>();
//		UserRole userRole = new UserRole();
//		userRole.setRole(role1);
//		userRole.setUser(user);
//		userRoleSet.add(userRole);
//
//	User user1 = this.userService.createUser(user,userRoleSet);
//		System.out.println(user1.getName());


	}
}
