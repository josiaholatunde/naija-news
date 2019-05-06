import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post';
import { AlertifyService } from 'src/app/services/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  posts: Post[] = [];
  shouldShow: boolean;
  shouldRotate: any;
  totalItems: number;
  pageSize = 5;
  pageNumber = 1;
  loggedInUser: any;
  constructor(private postsService: PostService, private authService: AuthService,
     private alertify: AlertifyService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.loggedInUser = this.authService.getLoggedInUser();
    this.getPosts(this.pageNumber);
    this.postsService.getPostsListener().subscribe((posts: Post[]) => {
      this.spinner.hide();
      this.posts = posts;
    });

  }
  getPosts(pageNumber?: number) {
    this.postsService.getPostsDetail(pageNumber, this.pageSize).subscribe(res => {
      this.alertify.success(res.message);
      this.totalItems = res.totalItems;
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
    this.alertify.confirm('Are you sure you want to delete this post ?', () => {
      this.postsService
        .deletePost(id)
        .subscribe((message) => {
          this.alertify.success(message);
        }, err => this.alertify.error(err));
    });
  }
  pageChanged($event) {
    const pageNumber = $event.page;
    this.getPosts(pageNumber);
  }


}
