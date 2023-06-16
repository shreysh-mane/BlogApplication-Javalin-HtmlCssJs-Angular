package com.revature.blogservice.dao;



import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.revature.blogservice.entity.BlogPost;

import io.javalin.http.UploadedFile;



public class BlogPostDaoImpl implements BlogPostDao {



	private Connection connection;

	
    public BlogPostDaoImpl(Connection connection) {
        this.connection = connection;
    }
 
    @Override
    public BlogPost createBlogPost(BlogPost blogPost) {
        try {
            String sql = "INSERT INTO blog_posts (title, content, category, date,featured_image, creator_id) VALUES (?,?, ?, ?, ?, ?)";
            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, blogPost.getTitle());
            statement.setString(2, blogPost.getContent());
            statement.setString(3, blogPost.getCategory());
            statement.setString(4, blogPost.getDate());
            statement.setString(5, blogPost.getFeaturedImage());
            statement.setInt(6, blogPost.getCreatorId());

            int rowsAffected = statement.executeUpdate();
            if (rowsAffected > 0) {
                ResultSet generatedKeys = statement.getGeneratedKeys();
                if (generatedKeys.next()) {
                    int postId = generatedKeys.getInt(1);
                    
                    
//                    String imageLocationPath = saveFeaturedImage(postId, featuredImage);
//                    updateBlogImage(imageLocationPath,postId);
                    
                    blogPost.setId(postId);
//                    blogPost.setFeaturedImage(imageLocationPath);
                    return blogPost;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
    
//    private static String saveFeaturedImage(int postId, UploadedFile file) {
//        try {
//        	 String blogId= Integer.toString(postId);
//            File imageDirectory = new File("images");
//            if (!imageDirectory.exists()) {
//                imageDirectory.mkdirs();
//            }
//            String fileName = blogId + "_" + file.filename();
//            File savedFile = new File(imageDirectory, fileName);
//            Files.copy(file.content(), savedFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
//
//            return savedFile.getAbsolutePath();
//        } catch (IOException e) {
//            e.printStackTrace();
//            return null;
//        }
//    }
//    
//    private void updateBlogImage(String imagePath,int postId) {
//    	try {
//    		
//            String sqlUpdate = "UPDATE blog_posts SET featured_image = ? WHERE id = ?";
//            PreparedStatement updateStatement = connection.prepareStatement(sqlUpdate);
//       
//            updateStatement.setString(1, imagePath);
//            updateStatement.setInt(2, postId);
//            updateStatement.executeUpdate();
//            
//        } catch (SQLException e) {
//            e.printStackTrace();
//        }
//        
//    }


    @Override
    public boolean updateBlogPost(int postId, BlogPost blogPost) {
        try {
        	
//        	String imageLocationPath = saveFeaturedImage(postId, featuredImage);
        	
            String sql = "UPDATE blog_posts SET title = ?, content = ?, category = ?, date = ?, featured_image = ? WHERE id = ?";
            PreparedStatement statement = connection.prepareStatement(sql);
            statement.setString(1, blogPost.getTitle());
            statement.setString(2, blogPost.getContent());
            statement.setString(3, blogPost.getCategory());
            statement.setString(4, blogPost.getDate());
            statement.setString(5, blogPost.getFeaturedImage());
            statement.setInt(6, postId);

            int rowsAffected = statement.executeUpdate();
            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public boolean deleteBlogPost(int postId) {
        try {
            String sql = "DELETE FROM blog_posts WHERE id = ?";
            PreparedStatement statement = connection.prepareStatement(sql);
            statement.setInt(1, postId);

            int rowsAffected = statement.executeUpdate();
            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public BlogPost getBlogPost(int postId) {
        try {
            String sql = "SELECT * FROM blog_posts WHERE id = ?";
            PreparedStatement statement = connection.prepareStatement(sql);
            statement.setInt(1, postId);

            ResultSet resultSet = statement.executeQuery();
            if (resultSet.next()) {
                BlogPost blogPost = new BlogPost(
                        resultSet.getInt("id"),
                        resultSet.getString("title"),
                        resultSet.getString("content"),
                        resultSet.getString("category"),
                        resultSet.getString("date"),
                        resultSet.getString("featured_image"),
                        resultSet.getInt("creator_id")
                );
                return blogPost;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<BlogPost> getAllBlogPosts() {
        List<BlogPost> blogPosts = new ArrayList<>();
        try {
            String sql = "SELECT * FROM blog_posts";
            PreparedStatement statement = connection.prepareStatement(sql);

            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next()) {
                BlogPost blogPost = new BlogPost(
                        resultSet.getInt("id"),
                        resultSet.getString("title"),
                        resultSet.getString("content"),
                        resultSet.getString("category"),
                        resultSet.getString("date"),
                        resultSet.getString("featured_image"),
                        resultSet.getInt("creator_id")
                );
                blogPosts.add(blogPost);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return blogPosts;
    }

    @Override
    public List<BlogPost> getBlogPostsByCategory(String category) {
        List<BlogPost> blogPosts = new ArrayList<>();
        try {
            String sql = "SELECT * FROM blog_posts WHERE category = ?";
            PreparedStatement statement = connection.prepareStatement(sql);
            statement.setString(1, category);

            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next()) {
                BlogPost blogPost = new BlogPost(
                        resultSet.getInt("id"),
                        resultSet.getString("title"),
                        resultSet.getString("content"),
                        resultSet.getString("category"),
                        resultSet.getString("date"),
                        resultSet.getString("featured_image"),
                        resultSet.getInt("creator_id")
                );
                blogPosts.add(blogPost);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return blogPosts;
    }

    @Override
    public List<BlogPost> getBlogPostsByCreator(int creatorId) {
        List<BlogPost> blogPosts = new ArrayList<>();
        try {
            String sql = "SELECT * FROM blog_posts WHERE creator_id = ?";
            PreparedStatement statement = connection.prepareStatement(sql);
            statement.setInt(1, creatorId);

            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next()) {
                BlogPost blogPost = new BlogPost(
                        resultSet.getInt("id"),
                        resultSet.getString("title"),
                        resultSet.getString("content"),
                        resultSet.getString("category"),
                        resultSet.getString("date"),
                        resultSet.getString("featured_image"),
                        resultSet.getInt("creator_id")
                );
                blogPosts.add(blogPost);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return blogPosts;
    }
    
    
}
