document.addEventListener('DOMContentLoaded', () => {

const updateBlogForm = document.getElementById('update-blog-form');
const blogId = getBlogIdFromUrl();


updateBlogForm.addEventListener('submit', updateBlog);

function getBlogIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function updateBlog(event) {
  event.preventDefault(); 

    var title = document.getElementById("title").value;
    var content = document.getElementById("content").value;
    var category = document.getElementById("category").value;
    var date = document.getElementById("date").value;
    var featuredImage = document.getElementById("featured-image").value;
      
     

    var formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("date", date);
    formData.append("featuredImage", featuredImage);
  

  
  fetch(`http://localhost:9002/blog-posts/${blogId}`, {
    method: 'PUT',
    body: formData
  })
  .then(function (response) {
    if (response.ok) {
        window.location.href = "dashboard.html";
    } else {
      throw new Error("Failed to create blog post.");
    }
  })
  .catch(function (error) {
    
    console.error(error);
    var errorMessage = document.getElementById("errorMessage");
    errorMessage.textContent = "Failed to save blog post.";
    errorMessage.style.color = "red";
  });
    }
});