import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl = `${environment.apiUrl}/posts`;
  private postsObservable = new BehaviorSubject<Post[]>([]);
  private posts: Post[];
  constructor(private http: HttpClient, private authService: AuthService) { }

  getPostsListener() {
    return this.postsObservable.asObservable();
  }
  getPosts() {
    return this.http.get<{
      message: string, posts: Post[]
    }>(this.baseUrl)
      .pipe(
        map((res) => {
          this.posts = [...res.posts];
          this.postsObservable.next([...res.posts]);
          return res.message;
        })
      );
  }
  getPost(id: string) {
    return this.http.
                  get<{message: string, post: Post}>(`${this.baseUrl}/${id}`);
  }
  getPostsDetail(pageNumber, pageSize) {
    const params = new HttpParams();
    if (pageNumber && pageSize) {
      params.append('pageSize', pageSize);
      params.append('pageNumber', pageNumber);
    }
    return this.http.get<{
      message: string, posts: Post[], totalItems: number
    }>(`${this.baseUrl}/all?pageSize=${pageSize}&pageNumber=${pageNumber}`, {observe: 'body', params})
      .pipe(
        map((res) => {
          this.posts = [...res.posts];
          this.postsObservable.next([...res.posts]);
          return {
            message: res.message,
            totalItems: res.totalItems
          };
        })
      );
  }
  createPost(post: any) {
    const {
      title,
      description,
      image,
      category
    } = post;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image, title);
    formData.append('category', category);
    return this.http.post<{
      message: string, post: Post
    }>(this.baseUrl, formData)
    .pipe(map((res) => {

      this.posts.push(res.post);
      this.postsObservable.next([...this.posts]);
      return res.message;
    }));

  }
  editPost(postToUpdate: any) {
    let formData: FormData | Post;
    const creator = this.authService.getLoggedInUser().id;
    console.log('c', creator);
    const {
      id,
      title,
      description,
      image,
      category,
      dateCreated,
    } = postToUpdate;
    if (typeof(postToUpdate.image) === 'object') {
      formData = new FormData();
      formData.append('id', id);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('image', image, title);
      formData.append('category', category);
      formData.append('creator', creator);
    } else {
      formData = {
        id,
        title,
        description,
        imagePath: image,
        category,
        dateCreated,
        creator
      };
    }
    return this.http.put<{
      message: string, imagePath: string
    }>(`${this.baseUrl}/${postToUpdate.id}`, formData)
    .pipe(map((res) => {
      const index = this.posts.findIndex(p => p.id === postToUpdate.id);
      const updatedPost: Post = {
        id,
        title,
        description,
        imagePath: res.imagePath,
        category,
        dateCreated,
        creator
      }
      this.posts[index] = updatedPost;
      console.log(this.posts);
      this.postsObservable.next([...this.posts]);
      return res.message;
    }));
  }
  deletePost(postId: string) {
    return this.http
              .delete<{message: string}>(`${this.baseUrl}/${postId}`)
              .pipe(map(res => {
                const posts = this.posts.filter(p => p.id !== postId);
                this.posts = posts;
                this.postsObservable.next([...this.posts]);
                return res.message;
              }));
  }
}
