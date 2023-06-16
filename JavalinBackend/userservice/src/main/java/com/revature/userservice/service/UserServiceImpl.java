package com.revature.userservice.service;

import java.util.List;

import com.revature.userservice.dao.UserDao;
import com.revature.userservice.entity.User;

public class UserServiceImpl implements UserService {
    private UserDao userDao;

    public UserServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public User createUser(User user) {
        return userDao.createUser(user);
    }

    @Override
    public boolean updateUser(int userId, User user) {
        return userDao.updateUser(userId, user);
    }

    @Override
    public boolean deleteUser(int userId) {
        return userDao.deleteUser(userId);
    }

    @Override
    public User getUser(int userId) {
        return userDao.getUser(userId);
    }
    
    @Override
    public List<User> getAllUsers() {
        return userDao.getAllUsers();
    }

    @Override
    public User getUserByEmail(String email) {
        return userDao.getUserByEmail(email);
    }
}

