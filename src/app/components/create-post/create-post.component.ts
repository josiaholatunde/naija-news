import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from 'src/app/models/post';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
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
  categories = [
    {displayName: 'Business', value: Category.Business},
    {displayName: 'Culture', value: Category.Culture},
    {displayName: 'Entertainment', value: Category.Entertainment},
    {displayName: 'News Style', value: Category.NewsStyle},
    {displayName: 'Sports', value: Category.Sport},
  ];
  @ViewChild('postFormControl') postFormControl: NgForm;
  postFormGroup: FormGroup;
  formMode = FormMode.Create;
  currentPost: Post;
  imagePreview: string | ArrayBuffer;
  postId: string;

  constructor(private postService: PostService, private alertify: AlertifyService, private router: Router,
     private route: ActivatedRoute) { }

  ngOnInit() {
    this.initializeFormGroup();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.formMode = FormMode.Edit;
        const postId = paramMap.get('postId');
        this.postService
            .getPost(postId)
            .subscribe(res => {
              const {id, title, description, category, dateCreated, imagePath} = res.post;
              this.postId = id;
              this.postFormGroup.setValue({
                title,
                description,
                category,
                image: imagePath
              });
              this.alertify.success(res.message);
            }, err => this.alertify.error('Error in fetching Post'));
      } else {
        this.formMode = FormMode.Create;
      }
    });

  }
  initializeFormGroup() {
    this.postFormGroup = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required, Validators.maxLength(48)]}),
      description: new FormControl(null, {validators: [Validators.required]}),
      category: new FormControl(null, {validators: [Validators.required]}),
      image: new FormControl(null, {validators: [Validators.required]})
    });
  }
  createPost() {
    if (this.postFormGroup.invalid) {
      return;
    }
    if (this.formMode === FormMode.Create) {
      this.postService
      .createPost(this.postFormGroup.value)
      .subscribe(message => {
        this.alertify.success(message);
      }, err => this.alertify.error(err),
      () => {
        this.postFormGroup.reset();
        this.router.navigate(['posts']);
      });
    } else {
      console.log('Form Mode', this.formMode);
      this.postService
      .editPost({...this.postFormGroup.value, id: this.postId})
      .subscribe((message) => {
        this.alertify.success(message);
      }, err => this.alertify.error(err),
      () => {
        this.postFormGroup.reset();
        this.router.navigate(['posts']);
      });
    }

  }
  onImagePicked(event: Event) {
    const elem = (event.target as HTMLInputElement).files[0];
    this.postFormGroup.patchValue({
      image: elem
    });
    this.postFormGroup.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(elem);
  }

}
