const dateHeader = document.getElementById('date-header');
const categoryFilter = document.getElementById('category-filter');
const authorFilter = document.getElementById('author-filter');

let uniqueUsers = [];
let uniqueCategory = [];

dateHeader.addEventListener('click', toggleDateSort);
authorFilter.addEventListener('change', fetchByUser);
categoryFilter.addEventListener('change', fetchByCategory);

let sortDescending = false;

// function fetchBlogs(apiUrl) {
//   fetch(apiUrl)
//     .then(response => response.json())
//     .then(data => {
//       const tableBody = document.getElementById('blog-table-body');
//       tableBody.innerHTML = '';
//       console.log(data);


//       data.forEach(blog => {
//          fetch(`http://localhost:9001/users/${blog.creatorId}`)
//           .then(response => response.json())
//           .then(user => {
//             const row = document.createElement('tr');
//             row.innerHTML = `
//               <td>${blog.title}</td>
//               <td>${user.name}</td>
//               <td>${blog.category}</td>
//               <td>${blog.date}</td>
//               <td>
//                 <button onclick="viewBlog(${blog.id})">View</button>
//               </td>
//             `;
//             tableBody.appendChild(row);

//             let userObj = {
//               userName: user.name,
//               userId: user.id
//             };

//             if (!uniqueUsers.find(u => u.userId === user.id)) {
//               uniqueUsers.push(userObj);
//               const option = document.createElement('option');
//               option.value = userObj.userId;
//               option.textContent = userObj.userName;
//               authorFilter.appendChild(option);
//             }

//             if (!uniqueCategory.find(c => c === blog.category)) {
//                             uniqueCategory.push(blog.category);
//                             const option = document.createElement('option');
//                             option.value = blog.category;
//                             option.textContent = blog.category;
//                             categoryFilter.appendChild(option);
//                           }
//           })
//           .catch(error => {
//             console.error('Error fetching user details:', error);
//           });
//       });
//     })
//     .catch(error => {
//       console.error('Error fetching blogs:', error);
//     });
// }

async function fetchBlogs(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    const tableBody = document.getElementById('blog-table-body');
    tableBody.innerHTML = '';
    

    for (const blog of data) {
      try {
        const userResponse = await fetch(`http://localhost:9001/users/${blog.creatorId}`);
        const user = await userResponse.json();

        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${blog.title}</td>
          <td>${user.name}</td>
          <td>${blog.category}</td>
          <td>${blog.date}</td>
          <td>
            <button onclick="viewBlog(${blog.id})">View</button>
          </td>
        `;
        tableBody.appendChild(row);

        let userObj = {
          userName: user.name,
          userId: user.id
        };

        if (!uniqueUsers.find(u => u.userId === user.id)) {
          uniqueUsers.push(userObj);
          const option = document.createElement('option');
          option.value = userObj.userId;
          option.textContent = userObj.userName;
          authorFilter.appendChild(option);
        }

        if (!uniqueCategory.find(c => c === blog.category)) {
          uniqueCategory.push(blog.category);
          const option = document.createElement('option');
          option.value = blog.category;
          option.textContent = blog.category;
          categoryFilter.appendChild(option);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }
  } catch (error) {
    console.error('Error fetching blogs:', error);
  }
}


function viewBlog(blogId) {
  window.location.href = `show-blog.html?id=${blogId}`;
}

function addNewBlog() {
  window.location.href = 'add-blog.html';
}

function logout() {
  localStorage.removeItem('userData');
  window.location.href = 'index.html';
}

function toggleDateSort() {
  sortDescending = !sortDescending;
  defFetch();
}

function defFetch() {
  let apiUrl = 'http://localhost:9002/blog-posts';

  if (sortDescending) {
    apiUrl += '?sort=desc';
    dateHeader.innerHTML = 'Date : DSC';
    authorFilter.value='all';
    categoryFilter.value='all';
  } else {
    apiUrl += '?sort=asc';
    dateHeader.innerHTML = 'Date : ASC';
    authorFilter.value='all';
    categoryFilter.value='all';
  }

  fetchBlogs(apiUrl);
}

function fetchByCategory() {
  let apiUrl = 'http://localhost:9002/blog-posts';
  const selectedCategory = categoryFilter.value;
  authorFilter.value = 'all';
  dateHeader.innerHTML="Date";

  if (selectedCategory === 'all') {
    defFetch()
  } else {
    apiUrl += `/category/${selectedCategory}`;
    fetchBlogs(apiUrl);
  }

}

function fetchByUser() {
  let apiUrl = 'http://localhost:9002/blog-posts';
  const selectedUser = authorFilter.value;
  categoryFilter.value = 'all';
  dateHeader.innerHTML="Date";

  if (selectedUser === 'all') {
    defFetch()
  } else {
    apiUrl += `/creator/${selectedUser}`;
    fetchBlogs(apiUrl);
  }
}

defFetch();

console.log(uniqueUsers);
