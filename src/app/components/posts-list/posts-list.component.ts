import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post';
import { AlertifyService } from 'src/app/services/alertify.service';
import { FormMode } from 'src/app/models/FormMode';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  posts: Post[] = [];
  shouldShow: boolean;
  shouldRotate: any;
  constructor(private postsService: PostService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getPosts();
    this.postsService.getPostsListener().subscribe((posts: Post[]) => {
      this.posts = posts;
      console.log('Posts', posts);
    });

  }
  getPosts() {
    this.postsService.getPostsDetail().subscribe(message => {
      this.alertify.success(message);
    }, err => this.alertify.error(err));
  }
  closeDetail(id: string) {
    const detailDiv = document.getElementById(`detail${id}`);
    const mainDiv = document.getElementById(`main${id}`);
    if (detailDiv && detailDiv.classList.contains('d-none')) {
      detailDiv.classList.remove('d-none');
      mainDiv.style.color = 'green';
    } else {
      detailDiv.classList.add('d-none');
      mainDiv.style.color = 'black';
    }
  }
  deletePost(id: string) {
    this.postsService
        .deletePost(id)
        .subscribe((message) => {
          this.alertify.success(message);
        }, err => this.alertify.error(err));
  }


}
