import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl = `${environment.apiUrl}/posts`;
  private postsObservable = new Subject<Post[]>();
  private posts: Post[];
  constructor(private http: HttpClient) { }

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
  getPostsDetail() {
    return this.http.get<{
      message: string, posts: Post[]
    }>(`${this.baseUrl}/all`)
      .pipe(
        map((res) => {
          this.posts = [...res.posts];
          this.postsObservable.next([...res.posts]);
          return res.message;
        })
      );
  }
  createPost(post: any) {
    return this.http.post<{
      message: string, post: Post
    }>(this.baseUrl, post)
    .pipe(map((res) => {

      this.posts.push(res.post);
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
