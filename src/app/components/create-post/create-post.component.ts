import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from 'src/app/models/post';
import { NgForm } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Category } from 'src/app/models/Category';
import { FormMode } from 'src/app/models/FormMode';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  postForm: Post = {
    id: '',
    title: '',
    description: '',
    category: null,
    dateCreated: new Date()
  };
  categories = [
    {displayName: 'Business', value: Category.Business},
    {displayName: 'Culture', value: Category.Culture},
    {displayName: 'Entertainment', value: Category.Entertainment},
    {displayName: 'News Style', value: Category.NewsStyle},
    {displayName: 'Sports', value: Category.Sport},
  ];
  @ViewChild('postFormControl') postFormControl: NgForm;
  formMode = FormMode.Create;
  currentPost: Post;

  constructor(private postService: PostService, private alertify: AlertifyService, private router: Router,
     private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.formMode = FormMode.Edit;
        const postId = paramMap.get('postId');
        this.postService
            .getPost(postId)
            .subscribe(res => {
              this.currentPost = res.post;
              this.alertify.success(res.message);
            }, err => this.alertify.error('Error in fetching Post'));
        console.log('Post Id', );
      } else {
        this.formMode = FormMode.Create;
      }
    });

  }
  createPost() {
    if (this.postFormControl.invalid) {
      return;
    }
    this.postService
        .createPost(this.postForm)
        .subscribe(message => {
          this.alertify.success(message);
        }, err => this.alertify.error(err),
        () => {
          this.postFormControl.resetForm();
          this.router.navigate(['posts']);
        });

  }

}
