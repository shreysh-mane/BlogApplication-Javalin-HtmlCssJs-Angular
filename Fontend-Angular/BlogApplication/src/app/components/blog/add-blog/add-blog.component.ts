import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent {
  blog = {
    title: '',
    content: '',
    category: '',
    date: '',
    featuredImage: ''
  };
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  handleAddBlog(event: Event): void {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', this.blog.title);
    formData.append('content', this.blog.content);
    formData.append('category', this.blog.category);
    formData.append('date', this.blog.date);
    formData.append('featuredImage', this.blog.featuredImage);
    const userId = JSON.parse(localStorage.getItem('userData')!).id;
    formData.append('userId', userId);

    this.http.post<any>('http://localhost:9002/blog-posts', formData)
      .subscribe(
        () => {
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error(error);
          this.errorMessage = 'Failed to save blog post.';
        }
      );
  }
}
