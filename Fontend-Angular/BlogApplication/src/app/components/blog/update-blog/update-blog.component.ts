
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from 'src/app/service/blog/blog.service';

@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.css']
})
export class UpdateBlogComponent implements OnInit {
  updateBlogForm: FormGroup;
  blogId!: number;
  errorMessage!: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) {
    this.updateBlogForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      featuredImage: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.blogId = this.route.snapshot.params['id'];
    this.loadBlogPost();
  }

  loadBlogPost(): void {
    this.blogService.getBlog(this.blogId.toString()).subscribe(
      (blogPost) => {
        this.updateBlogForm.patchValue({
          title: blogPost.title,
          content: blogPost.content,
          category: blogPost.category,
          date: blogPost.date,
          featuredImage: blogPost.featuredImage
        });
      },
      (error) => {
        console.error('Failed to fetch blog post', error);
      }
    );
  }

  updateBlog(): void {
    if (this.updateBlogForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('title', this.updateBlogForm.get('title')!.value);
    formData.append('content', this.updateBlogForm.get('content')!.value);
    formData.append('category', this.updateBlogForm.get('category')!.value);
    formData.append('date', this.updateBlogForm.get('date')!.value);
    formData.append('featuredImage', this.updateBlogForm.get('featuredImage')!.value);


    this.blogService.updateBlog(this.blogId, formData)
    .subscribe(
      response => {
        console.log(response); 
        this.router.navigate(['/dashboard']); 
      },
      error => {
    
        console.error(error); 
        this.errorMessage = 'Failed to update blog post.';
      }
    );
  }
}
