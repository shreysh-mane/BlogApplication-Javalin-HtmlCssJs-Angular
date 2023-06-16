package com.revature.userservice;
import io.javalin.Javalin;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import com.revature.userservice.controller.UserController;
import com.revature.userservice.dao.UserDao;
import com.revature.userservice.dao.UserDaoImpl;
import com.revature.userservice.service.UserService;
import com.revature.userservice.service.UserServiceImpl;


public class App {
    private static Connection connection;

    public static void main(String[] args) {

    	Javalin app = Javalin.create(config -> {
    	    config.plugins.enableCors(cors -> {
    	        cors.add(it -> {
    	            it.anyHost();
    	        });
    	    });
    	}).start(9001);

        
        setupDatabase();

        
        UserDao userDao = new UserDaoImpl(connection);
        UserService userService = new UserServiceImpl(userDao);
        UserController userController = new UserController(userService);

        app.post("/users", userController::createUser);
        app.put("/users/{userId}", userController::updateUser);
        app.delete("/users/{userId}", userController::deleteUser);
        app.get("/users/{userId}", userController::getUser);
        app.get("/users", userController::getAllUsers);
        app.post("/login", userController::handleLogin);
    }

    private static void setupDatabase() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            String url = "jdbc:mysql://localhost:3306/blogapplication";
            String username = "root";
            String password = "shreysh@s";
            connection = DriverManager.getConnection(url, username, password);
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
    }
    
    
}