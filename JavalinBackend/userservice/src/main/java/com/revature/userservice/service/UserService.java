package com.revature.userservice.service;

import java.util.List;

import com.revature.userservice.entity.User;

public interface UserService {

	User createUser(User user);
    boolean updateUser(int userId, User user);
    boolean deleteUser(int userId);
    User getUser(int userId);
    List<User> getAllUsers();
    User getUserByEmail(String email);
}
