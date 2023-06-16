package com.revature.blogservice;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;


import com.revature.blogservice.controller.BlogPostController;
import com.revature.blogservice.dao.BlogPostDaoImpl;
import com.revature.blogservice.service.BlogPostService;
import com.revature.blogservice.dao.BlogPostDao;
import com.revature.blogservice.service.BlogPostServiceImpl;

import io.javalin.Javalin;

public class App 
{
	private static Connection connection;
	 
    public static void main( String[] args )
    {
    	setupDatabase();
    	
       
        BlogPostDao blogPostDao = new BlogPostDaoImpl(connection);
        BlogPostService blogPostService = new BlogPostServiceImpl(blogPostDao);

     
        Javalin app = Javalin.create(config -> {
    	    config.plugins.enableCors(cors -> {
    	        cors.add(it -> {
    	            it.anyHost();
    	        });
    	    });
    	}).start(9002);

     
        BlogPostController blogPostController = new BlogPostController(blogPostService);

       
        app.post("/blog-posts", blogPostController::createBlogPost);
        app.put("/blog-posts/{postId}", blogPostController::updateBlogPost);
        app.delete("/blog-posts/{postId}", blogPostController::deleteBlogPost);
        app.get("/blog-posts/{postId}", blogPostController::getBlogPost);
        app.get("/blog-posts", blogPostController::getAllBlogPosts);
        app.get("/blog-posts/category/{category}", blogPostController::getBlogPostsByCategory);
        app.get("/blog-posts/creator/{creatorId}", blogPostController::getBlogPostsByCreator);
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
