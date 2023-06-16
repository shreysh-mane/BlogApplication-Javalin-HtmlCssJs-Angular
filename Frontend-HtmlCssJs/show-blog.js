
const blogId = getBlogIdFromUrl();

function getBlogIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function fetchBlogDetails(blogId) {
    return fetch(`http://localhost:9002/blog-posts/${blogId}`)
        .then(response => response.json());
}

fetchBlogDetails(blogId)
    .then(blog => {
        displayBlogDetails(blog);
        checkUserPermissions(blog.creatorId);
    })
    .catch(error => {
        console.error('Error fetching blog details:', error);
});

function displayBlogDetails(blog) {
    const blogDetailsContainer = document.getElementById('blog-details');
    console.log(blog);
    blogDetailsContainer.innerHTML = `
        <h2>${blog.title}</h2>
        <p>Category: ${blog.category}</p>
        <p>Date: ${blog.date}</p>
        <p>${blog.content}</p>
        <img src="${blog.featuredImage}" alt="Blog Image">
    `;
}

function checkUserPermissions(creatorId) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const loggedInUserId = userData ? userData.id : null;

    if (loggedInUserId === creatorId) {
        const blogDetailsContainer = document.getElementById('blog-details');
        const buttonsContainer = document.createElement('div');
        buttonsContainer.innerHTML = `
            <button onclick="updateBlog(${blogId})">Update</button>
            <button onclick="deleteBlog(${blogId})">Delete</button>
        `;
        blogDetailsContainer.appendChild(buttonsContainer);
    }
}

function updateBlog(blogId) {
    window.location.href = `update-blog.html?id=${blogId}`;
}

function deleteBlog(blogId) {
    fetch(`http://localhost:9002/blog-posts/${blogId}`, {
        method: 'DELETE'
        })
        .then(() => {
            window.location.href = 'dashboard.html';
        })
        .catch(error => {
            console.error('Error deleting blog:', error);
        });
}
