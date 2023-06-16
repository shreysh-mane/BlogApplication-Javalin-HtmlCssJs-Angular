package com.revature.userservice.dao;

import java.util.List;

import com.revature.userservice.entity.User;

public interface UserDao {

	 User createUser(User user);
	 boolean updateUser(int userId, User user);
	 boolean deleteUser(int userId);
	 User getUser(int userId);
	 List<User> getAllUsers();
	 User getUserByEmail(String email);
}
