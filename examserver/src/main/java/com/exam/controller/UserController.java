package com.exam.controller;


import com.exam.model.Role;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    private UserService userService;

    private BCryptPasswordEncoder passwordEncoder;
    
    UserController(UserService userService ,BCryptPasswordEncoder passwordEncoder ){
    	this.userService = userService;
    	this.passwordEncoder = passwordEncoder;
    }

        @PostMapping("/")
        public User createUser(@RequestBody User user) throws Exception {



            user.setProfile("default.png");

                //encoding password with bcryptpassword

            user.setPassword(passwordEncoder.encode(user.getPassword()));


            Set<UserRole> roles = new HashSet<>();

            Role role = new Role();
            role.setRoleId(45L);
            role.setRoleName("NORMAL");

            UserRole userRole = new UserRole();
            userRole.setUser(user);
            userRole.setRole(role);

            roles.add(userRole);


            return userService.createUser(user,roles);


        }

        @GetMapping("/{username}")
        public  User getUser(@PathVariable("username") String username){

           return userService.getUser(username);
        }
    //update user
    @PutMapping("/{userId}")
    public User updateUser(@PathVariable("userId") Long userId, @RequestBody User user) throws Exception {
        user.setId(userId);
        return userService.updateUser(user);
    }


    //delete user
        @DeleteMapping("/{userId}")
        public void deleteUser(@PathVariable("userId") Long userId){
        userService.deleteUser(userId);
        }
}
