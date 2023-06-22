import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../../models/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'http://localhost:9002/blog-posts';

  constructor(private http: HttpClient) { }

  getBlogs(url:string): Observable<Blog[]> {
    return this.http.get<Blog[]>(url);
  }

  getBlog(blogId: string): Observable<Blog> {
    const url = `${this.apiUrl}/${blogId}`;
    console.log(url);
    return this.http.get<Blog>(url);
  }

  createBlog(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(this.apiUrl, blog);
  }

 

  updateBlog(blogId: number, blogData: any): Observable<any> {
    const url = `${this.apiUrl}/${blogId}`;
    return this.http.put(url, blogData, { responseType: 'text' });
  }
  

  deleteBlog(blogId: string): Observable<any> {
    const url = `${this.apiUrl}/${blogId}`;
    return this.http.delete(url,{ responseType: 'text' });
  }
}
