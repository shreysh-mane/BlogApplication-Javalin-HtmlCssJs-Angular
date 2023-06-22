import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/service/blog/blog.service';
import { Blog } from 'src/app/models/blog';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css']
})
export class ViewBlogComponent implements OnInit {
  blog: Blog = {
    id: '',
    title: '',
    content: '',
    category: '',
    date: '',
    featuredImage: '',
    creatorId: ''
  };
  loggedInUserId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) { }

  ngOnInit() {
    this.loggedInUserId = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')!).id : null;
    this.fetchBlogDetails();
  }

  fetchBlogDetails() {
    const blogId = this.route.snapshot.params['id'];
    this.blogService.getBlog(blogId).subscribe(
      (blog: Blog) => {
        this.blog = blog;
      },
      (error) => {
        console.error('Error fetching blog details:', error);
      }
    );
  }

  updateBlog() {
    this.router.navigate(['update-blog', this.blog.id]);
  }

  deleteBlog() {
    this.blogService.deleteBlog(this.blog.id).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Error deleting blog:', error);
      }
    );
  }
}
