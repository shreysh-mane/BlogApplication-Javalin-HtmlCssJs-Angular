package com.revature.blogservice.service;

import java.util.List;

import com.revature.blogservice.dao.BlogPostDao;
import com.revature.blogservice.entity.BlogPost;

import io.javalin.http.UploadedFile;

public class BlogPostServiceImpl implements BlogPostService{

	private BlogPostDao blogPostDao;

    public BlogPostServiceImpl(BlogPostDao blogPostDao) {
        this.blogPostDao = blogPostDao;
    }

    @Override
    public BlogPost createBlogPost(BlogPost blogPost) {
        return blogPostDao.createBlogPost(blogPost);
    }

    @Override
    public boolean updateBlogPost(int postId, BlogPost blogPost) {
        return blogPostDao.updateBlogPost(postId, blogPost);
    }

    @Override
    public boolean deleteBlogPost(int postId) {
        return blogPostDao.deleteBlogPost(postId);
    }

    @Override
    public BlogPost getBlogPost(int postId) {
        return blogPostDao.getBlogPost(postId);
    }

    @Override
    public List<BlogPost> getAllBlogPosts() {
        return blogPostDao.getAllBlogPosts();
    }

    @Override
    public List<BlogPost> getBlogPostsByCategory(String category) {
        return blogPostDao.getBlogPostsByCategory(category);
    }

    @Override
    public List<BlogPost> getBlogPostsByCreator(int creatorId) {
        return blogPostDao.getBlogPostsByCreator(creatorId);
    }
}
