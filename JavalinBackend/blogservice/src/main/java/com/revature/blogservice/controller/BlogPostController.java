package com.revature.blogservice.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import com.revature.blogservice.entity.BlogPost;
import com.revature.blogservice.service.BlogPostService;

import io.javalin.http.Context;
import io.javalin.http.UploadedFile;

public class BlogPostController {

	
	private BlogPostService blogPostService;

    public BlogPostController(BlogPostService blogPostService) {
        this.blogPostService = blogPostService;
    }

    public void createBlogPost(Context context) {

    	String title = context.formParam("title");
        String content = context.formParam("content");
        String category = context.formParam("category");
        String date = context.formParam("date");
        int creatorId = Integer.parseInt(context.formParam("userId"));
       // UploadedFile featuredImage = context.uploadedFile("featuredImage");
        String featuredImage = context.formParam("featuredImage");
        
        
        BlogPost blogPost = new BlogPost();
        blogPost.setTitle(title);
        blogPost.setContent(content);
        blogPost.setCategory(category);
        blogPost.setDate(date);
        blogPost.setCreatorId(creatorId);
        blogPost.setFeaturedImage(featuredImage);
        
        		
        BlogPost createdBlogPost = blogPostService.createBlogPost(blogPost);
	          		if (createdBlogPost != null) {
	          			context.status(201);
	                    context.json(createdBlogPost);
	                } else {
	                    context.status(500);
	                    context.result("Failed to create blog post.");
	                }

    }

    public void updateBlogPost(Context context) {
  
        int postId = Integer.parseInt(context.pathParam("postId"));

     
        String title = context.formParam("title");
        String content = context.formParam("content");
        String category = context.formParam("category");
        String date = context.formParam("date");
        String featuredImage = context.formParam("featuredImage");
      
        
        BlogPost blogPost = new BlogPost();
        blogPost.setTitle(title);
        blogPost.setContent(content);
        blogPost.setCategory(category);
        blogPost.setDate(date);
        blogPost.setFeaturedImage(featuredImage);

       		
        boolean blogPostUpdated = blogPostService.updateBlogPost(postId, blogPost);
	          		if (blogPostUpdated) {
	          			context.status(200);
	                    context.result("Blog post updated successfully.");
	                } else {
	                	context.status(404);
	                    context.result("Blog post not found.");
	                }
    }

    public void deleteBlogPost(Context context) {
    
        int postId = Integer.parseInt(context.pathParam("postId"));

   
        boolean deleted = blogPostService.deleteBlogPost(postId);

        if (deleted) {
            context.status(200);
            context.result("Blog post deleted successfully.");
        } else {
            context.status(404);
            context.result("Blog post not found.");
        }
    }

    public void getBlogPost(Context context) {
       
        int postId = Integer.parseInt(context.pathParam("postId"));

    
        BlogPost blogPost = blogPostService.getBlogPost(postId);

        if (blogPost != null) {
            context.json(blogPost);
        } else {
            context.status(404);
            context.result("Blog post not found.");
        }
    }

    public void getAllBlogPosts(Context context) {
            
    	List<BlogPost> blogs = blogPostService.getAllBlogPosts();
        String sort = context.queryParam("sort");
        blogs=SortBlogs(blogs,sort);
        context.json(blogs);
    }

    private List<BlogPost> SortBlogs(List<BlogPost> blogs, String sort) {
		// TODO Auto-generated method stub
    	DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("uuuu-MM-dd");

        if (sort.equals("asc")) {
            return blogs = blogs.stream()
                    .sorted(Comparator.comparing((BlogPost b) -> LocalDate.parse(b.getDate(), dateFormatter)))
                    .collect(Collectors.toList());
        } else {
           return  blogs = blogs.stream()
                    .sorted(Comparator.comparing((BlogPost b) -> LocalDate.parse(b.getDate(), dateFormatter)).reversed())
                    .collect(Collectors.toList());
        }
	}

	public void getBlogPostsByCategory(Context context) {

        String category = context.pathParam("category");
        System.out.println(category);

        List<BlogPost> blogPosts = blogPostService.getBlogPostsByCategory(category);
        context.json(blogPosts);
    }

    public void getBlogPostsByCreator(Context context) {
     
        int creatorId = Integer.parseInt(context.pathParam("creatorId"));

        List<BlogPost> blogPosts = blogPostService.getBlogPostsByCreator(creatorId);
        context.json(blogPosts);
    }
}
