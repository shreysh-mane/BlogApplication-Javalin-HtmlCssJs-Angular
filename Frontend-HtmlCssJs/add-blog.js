document.addEventListener('DOMContentLoaded', () => {
    const addBlogForm = document.getElementById('add-blog-form');
    addBlogForm.addEventListener('submit', handleAddBlog);
  
    function handleAddBlog(event) {
      event.preventDefault();
  
      var title = document.getElementById("title").value;
      var content = document.getElementById("content").value;
      var category = document.getElementById("category").value;
      var date = document.getElementById("date").value;
      var featuredImage = document.getElementById("featured-image").value;
      const userId = JSON.parse(localStorage.getItem('userData')).id;
     
      var formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);
      formData.append("date", date);
      formData.append("featuredImage", featuredImage);
      formData.append("userId", userId);


   
      fetch("http://localhost:9002/blog-posts", {
        method: "POST",
        body: formData,
      })
        .then(function (response) {
          if (response.ok) {
           // console.log(response.json())
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
  