package com.exam.services;

import com.exam.model.User;
import com.exam.model.exam.UserQuiz;
import com.exam.model.UserRole;

import java.util.List;
import java.util.Set;

public interface UserService {

    //creating User

        public User createUser(User user, Set<UserRole> userRoles) throws Exception;

        //get user by Usernme

        public  User getUser(String username);

        //delete user

        public  void deleteUser(Long userId);

        User updateUser(User user) throws Exception;

        List<UserQuiz> getUserQuizzes(String username);
}
