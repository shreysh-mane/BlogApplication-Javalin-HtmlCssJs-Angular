import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/service/blog/blog.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  blogs: any[] = [];
  uniqueUsers: any[] = [];
  uniqueCategory: string[] = [];
  sortDescending = false;


  constructor(
    private router: Router,
    private blogService: BlogService,
    private userService: UserService
  ) { }

  @ViewChild('categoryFilter') categoryFilter!: ElementRef<HTMLSelectElement>;
  @ViewChild('authorFilter') authorFilter!: ElementRef<HTMLSelectElement>;


  ngOnInit() {
    this.defaultFetch();
  }

  fetchBlogs(apiUrl: string) {
    this.blogService.getBlogs(apiUrl).subscribe(
      (data: any[]) => {
        this.blogs = data;
        const selectedUser = this.authorFilter.nativeElement.value;
        const selectedCategory = this.categoryFilter.nativeElement.value;
      if (selectedUser === 'all' && selectedCategory === 'all') {
          this.uniqueUsers = this.getUniqueUsers(data);
          this.uniqueCategory = this.getUniqueCategories(data);
        }
      },
      (error: any) => {
        console.error('Error fetching blogs:', error);
      }
    );
  }

  getUniqueCategories(blogs: any[]) {
    return [...new Set(blogs.map(blog => blog.category))];
  }

  getUniqueUsers(blogs: any[]) {
    const userIds = [...new Set(blogs.map(blog => blog.creatorId))];
    const uniqueUsers: any[] = [];

    for (const userId of userIds) {
      this.userService.getUser(userId).subscribe(
        (user) => {
          uniqueUsers.push({
            userId: user.id,
            userName: user.name
          });
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    }
    return uniqueUsers;
  }

  fetchByCategory() {
    const selectedCategory = this.categoryFilter.nativeElement.value;

    if (selectedCategory === 'all') {
      this.defaultFetch();
    } else {
      const apiUrl = `http://localhost:9002/blog-posts/category/${selectedCategory}`;
      this.fetchBlogs(apiUrl);
    }
  }

  fetchByUser() {
    const selectedUser = this.authorFilter.nativeElement.value;
    if (selectedUser === 'all') {
      this.defaultFetch();
    } else {
      const apiUrl = `http://localhost:9002/blog-posts/creator/${selectedUser}`;
      this.fetchBlogs(apiUrl);
    }
  }

  defaultFetch() {
    let apiUrl = 'http://localhost:9002/blog-posts';

    if (this.sortDescending) {
      apiUrl += '?sort=desc';
    } else {
      apiUrl += '?sort=asc';
    }

    this.fetchBlogs(apiUrl);
  }


  getUserById(userId: string) {
    return this.uniqueUsers.find(user => user.userId === userId);
  }

  viewBlog(blogId: string) {
    this.router.navigate(['view-blog', blogId] );
  }

  addNewBlog() {
    this.router.navigate(['add-blog']);
  }

  logout() {
    localStorage.removeItem('userData');
    this.router.navigate(['signin']);
  }

  toggleDateSort() {
    this.sortDescending = !this.sortDescending;
    this.defaultFetch();
  }

 
  goToProfile() {
    this.router.navigate(['profile']);
  }
  
}



