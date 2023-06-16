package com.revature.blogservice.entity;

public class BlogPost {

	private int id;
    private String title;
    private String content;
    private String category;
    private String date;
    private String featuredImage;
    private int creatorId;

    public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getFeaturedImage() {
		return featuredImage;
	}

	public void setFeaturedImage(String featuredImage) {
		this.featuredImage = featuredImage;
	}

	public int getCreatorId() {
		return creatorId;
	}

	public void setCreatorId(int creatorId) {
		this.creatorId = creatorId;
	}

	public BlogPost() {}
    
    public BlogPost(int id, String title, String content, String category, String date, String featuredImage,
			int creatorId) {
		super();
		this.id = id;
		this.title = title;
		this.content = content;
		this.category = category;
		this.date = date;
		this.featuredImage = featuredImage;
		this.creatorId = creatorId;
	}
    
    
}
