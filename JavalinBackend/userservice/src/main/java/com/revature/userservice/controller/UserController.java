package com.revature.userservice.controller;

import java.util.List;

import com.revature.userservice.entity.User;
import com.revature.userservice.service.UserService;

import io.javalin.http.Context;

public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    public void createUser(Context context) {
        User user = context.bodyAsClass(User.class);
        
        System.out.println(user.toString());
        
        User createdUser = userService.createUser(user);
        if (createdUser != null) {
            context.status(201);
            context.json(createdUser);
        } else {
            context.status(500);
            context.result("Failed to create user.");
        }
    }

    public void updateUser(Context context) {
        int userId = Integer.parseInt(context.pathParam("userId"));
        System.out.println(userId);
        User user = context.bodyAsClass(User.class);
        
        System.out.println(user.toString());
        boolean updated = userService.updateUser(userId, user);
        if (updated) {
            context.status(204);
            context.result("User Updated");
        } else {
            context.status(404);
            context.result("User not found.");
        }
    }

    public void deleteUser(Context context) {
        int userId = Integer.parseInt(context.pathParam("userId"));
        boolean deleted = userService.deleteUser(userId);
        if (deleted) {
            context.status(204);
        } else {
            context.status(404);
            context.result("User not found.");
        }
    }

    public void getUser(Context context) {
        int userId = Integer.parseInt(context.pathParam("userId"));
        User user = userService.getUser(userId);
        if (user != null) {
            context.json(user);
        } else {
            context.status(404);
            context.result("User not found.");
        }
    }
    
    public void getAllUsers(Context context) {
        List<User> users = userService.getAllUsers();
        context.json(users);
    }

    public void handleLogin(Context context) {
        
    	User tempUser = context.bodyAsClass(User.class);
    	
    	String email = tempUser.getEmail();
        String password = tempUser.getPassword();
        
        User user = userService.getUserByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
        	user.setPassword(null);
            context.json(user);
        } else {
            context.status(401);
            context.result("Invalid credentials.");
            System.out.println("INvalid");
        }
    }
    
    
}