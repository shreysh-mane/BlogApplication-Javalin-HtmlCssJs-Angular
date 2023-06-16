/**
 * 
 */
package com.revature.blogservice.dao;

import java.util.List;

import com.revature.blogservice.entity.BlogPost;

import io.javalin.http.UploadedFile;

public interface BlogPostDao {

	BlogPost createBlogPost(BlogPost blogPost);
    boolean updateBlogPost(int postId, BlogPost blogPost);
    boolean deleteBlogPost(int postId);
    BlogPost getBlogPost(int postId);
    List<BlogPost> getAllBlogPosts();
    List<BlogPost> getBlogPostsByCategory(String category);
    List<BlogPost> getBlogPostsByCreator(int creatorId);
	
}
